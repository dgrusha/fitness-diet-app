﻿using FitnessApp.Application.Common.Interfaces.Persistence;
using Microsoft.Extensions.Configuration;
using FitnessApp.Application.Common.FatSecret;
using Newtonsoft.Json;
using FitnessApp.Application.Common.Helpers;
using Dumpify;
using FitnessApp.Domain.Entities;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.JsonObjects;
using FitnessApp.Application.Common.NinjaApi;
using FitnessApp.Application.Common.JsonObjects.GetNinja;

namespace FitnessApp.Application.Common.HangfireTasks;
public class HangfireService
{
    private readonly IUserRepository _userRepository;
    private readonly IDietFormRepository _dietFormRepository;
    private readonly IObligatoryFormRepository _obligatoryFormRepository;
    private readonly IRecipeRepository _recipeRepository;
    private readonly IRecipeInstructionRepository _recipeInstructionRepository;
    private readonly IConfiguration _configuration;
    private readonly IFatSecretApi _fatSecretApi;
    private readonly INinjaApi _ninjaApi;
    private readonly ITrainingFormRepository _trainingFormRepository;
    private readonly IExcerciseRepository _excerciseRepository;

    public HangfireService
        (
            IUserRepository userRepository,
            IDietFormRepository dietFormRepository,
            IConfiguration configuration,
            IFatSecretApi fatSecretApi,
            IObligatoryFormRepository obligatoryFormRepository,
            IRecipeRepository recipeRepository,
            IRecipeInstructionRepository recipeInstructionRepository,
            INinjaApi ninjaApi,
            ITrainingFormRepository trainingFormRepository,
            IExcerciseRepository excerciseRepository
        )
    {
        _userRepository = userRepository;
        _dietFormRepository = dietFormRepository;
        _configuration = configuration;
        _fatSecretApi = fatSecretApi;
        _obligatoryFormRepository = obligatoryFormRepository;
        _recipeRepository = recipeRepository;
        _recipeInstructionRepository = recipeInstructionRepository;
        _ninjaApi = ninjaApi;
        _trainingFormRepository = trainingFormRepository;
        _excerciseRepository = excerciseRepository;
    }
    public async Task UpdateTrainingFormsEachTwoMinutes()
    {
        Dictionary<string, string> musclesToExcercises = new Dictionary<string, string>();
        List<string> daysOfTheWeek = new List<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        var trainingForms = _trainingFormRepository.GetNotStartedTrainingForms();
        foreach (var trainingForm in trainingForms)
        {
            List<string> usedMuscles = new List<string>();
            
            var daysToTrain = trainingForm.Days;
            string trainingSpecJson = File.ReadAllText("training_spec.json");
            AllDaysData? allDaysData = JsonConvert.DeserializeObject<AllDaysData>(trainingSpecJson);

            if (allDaysData.DayData.ContainsKey(daysToTrain.Count()))
            {
                foreach (var day in allDaysData.DayData[daysToTrain.Count()])
                {
                    int key = day.Key;
                    foreach (var part in day.Value)
                    {
                        foreach (var muscle in part.Value)
                        {
                            int index = usedMuscles.Count(x => x == muscle);
                            if (index > 10) 
                            {
                                index -= 10;
                            }
                            string excercises;
                            if (musclesToExcercises.ContainsKey(muscle))
                            {
                                excercises = musclesToExcercises[muscle];
                            }
                            else 
                            {
                                excercises = await _ninjaApi.GetExcercises(muscle, trainingForm.TrainingMode);
                                if (excercises == null || excercises == "[]" || excercises.Equals("[]")) 
                                {
                                    var tmpTrainMode = trainingForm.TrainingMode;
                                    tmpTrainMode.Name = "intermediate";
                                    excercises = await _ninjaApi.GetExcercises(muscle, tmpTrainMode);
                                }
                                musclesToExcercises.Add(muscle, excercises);
                            }

                            List<ExerciseJson> exercisesList = JsonConvert.DeserializeObject<List<ExerciseJson>>(excercises);
                            var excerciseJsonInstance = exercisesList.ElementAt(index);
                            Excercise excercise = new Excercise
                            {
                                Name = excerciseJsonInstance.name,
                                Muscle = muscle,
                                Part = part.Key,
                                Instructions = excerciseJsonInstance.instructions,
                                Difficulty = excerciseJsonInstance.difficulty,
                                Day = daysOfTheWeek.IndexOf(daysToTrain.ElementAt(key)),
                                TrainingFormId = trainingForm.Id
                            };
                            _excerciseRepository.Add(excercise);
                            usedMuscles.Add(muscle);
                        }
                    }
                }
            }
            _userRepository.UpdateUserTrainingStatus(trainingForm.User, PreparingStatus.Finished);
        }
    }

    public async Task UpdateDietFormsEachMinute()
    {
        string tokenInvalidCommunication = "Invalid token: The token is expired";
        string? accessToken = AccessTokenHandler.LoadAccessToken("access_token.json");
        if (accessToken == null || AccessTokenHandler.IsExpired(accessToken))
        {
            accessToken = await _fatSecretApi.Authenticate();
            AccessTokenHandler.SaveAccessToken("access_token.json", accessToken);
        }
        var dietForms = _dietFormRepository.GetNotStartedDietForms();
        if (dietForms != null &&  dietForms.Count() > 0) 
        {
            accessToken = await _fatSecretApi.Authenticate();
            Console.WriteLine(accessToken);
        }
        foreach (var dietForm in dietForms) 
        {
            User user = dietForm.User;

            if (user.ObligatoryForm == null)
            {
                _userRepository.UpdateUserDietStatus(user, PreparingStatus.NotSuceeded);
                continue;
            }

            double bmr = DietDataHelper.CountBMR(user.ObligatoryForm.Weight, user.ObligatoryForm.Height, user.ObligatoryForm.Years, user.ObligatoryForm.Gender);
            var cookingRange = dietForm.CookingRange;
            var activityMode = dietForm.ActivityMode;
            var dietMode = dietForm.DietMode;
            double tdee = DietDataHelper.CountTDEE(activityMode.Coeficient, dietMode.Coeficient, bmr);

            //Create handler for creating calorie range dto 
            CalorieRangeDto breakfastCalories = new CalorieRangeDto
            {
                CalorieStart = (tdee * 0.2) - 100,
                CalorieEnd = (tdee * 0.2) + 100
            };
            CalorieRangeDto lunchCalories = new CalorieRangeDto
            {
                CalorieStart = (tdee * 0.3) - 100,
                CalorieEnd = (tdee * 0.3) + 100
            };
            CalorieRangeDto dinnerCalories = new CalorieRangeDto
            {
                CalorieStart = (tdee * 0.35) - 100,
                CalorieEnd = (tdee * 0.35) + 100
            };
            try
            {
                var resBreakfast = await _fatSecretApi.GetRecipes(AccessTokenHandler.GetAccessTokenValue(accessToken), breakfastCalories, cookingRange, "Breakfast");
                var resLunch = await _fatSecretApi.GetRecipes(AccessTokenHandler.GetAccessTokenValue(accessToken), breakfastCalories, cookingRange, "Soup");
                var resDinner = await _fatSecretApi.GetRecipes(AccessTokenHandler.GetAccessTokenValue(accessToken), breakfastCalories, cookingRange, "Main Dish");

                if (resBreakfast == null || resBreakfast.Contains(tokenInvalidCommunication) ||
                    resLunch == null || resLunch.Contains(tokenInvalidCommunication) || 
                    resDinner == null || resDinner.Contains(tokenInvalidCommunication))
                {
                    throw new Exception("Expired or null value in res");
                }

                JsonObjects.Search.RecipeResponse recipeResponseBreakfast = JsonConvert.DeserializeObject<JsonObjects.Search.RecipeResponse>(resBreakfast);
                JsonObjects.Search.RecipeResponse recipeResponseLunch = JsonConvert.DeserializeObject<JsonObjects.Search.RecipeResponse>(resLunch);
                JsonObjects.Search.RecipeResponse recipeResponseDinner = JsonConvert.DeserializeObject<JsonObjects.Search.RecipeResponse>(resDinner);

                var obligatoryForm = _obligatoryFormRepository.GetFormById(user.Id);

                List<string> allergies = new List<string>();

                if (obligatoryForm != null && obligatoryForm.Allergies.Count() != 0) 
                {
                    allergies.AddRange(obligatoryForm.Allergies.Select(u => u.Food));
                }
                var recipesBreakfast = recipeResponseBreakfast.recipes.recipe;
                var recipesLunch = recipeResponseLunch.recipes.recipe;
                var recipesDinner = recipeResponseDinner.recipes.recipe;

                recipesBreakfast = recipesBreakfast.Where(recipe => allergies.All(excludedFood => !recipe.recipe_ingredients.ingredient.Any(t => t.Contains(excludedFood))))
                                     .ToList();
                recipesLunch = recipesLunch.Where(recipe => allergies.All(excludedFood => !recipe.recipe_ingredients.ingredient.Any(t => t.Contains(excludedFood))))
                                     .ToList();
                recipesDinner = recipesDinner.Where(recipe => allergies.All(excludedFood => !recipe.recipe_ingredients.ingredient.Any(t => t.Contains(excludedFood))))
                                     .ToList();

                int countRecipeBreakfast = recipesBreakfast.Count();
                int countRecipeLunch = recipesLunch.Count();
                int countRecipeDinner = recipesDinner.Count();

                if (countRecipeBreakfast < 2 || countRecipeLunch < 2 || countRecipeDinner < 2) 
                {
                    _userRepository.UpdateUserDietStatus(user, PreparingStatus.NotSuceeded);
                    continue;
                }

                List<JsonObjects.Search.Recipe> breakfastsSelected = new();
                List<JsonObjects.Search.Recipe> lunchesSelected = new();
                List<JsonObjects.Search.Recipe> dinnersSelected = new();

                // Add handler for checking this ranges
                while (breakfastsSelected.Count() < 7)
                {
                    if (countRecipeBreakfast < 7)
                    {
                        breakfastsSelected.AddRange(recipesBreakfast.Take(countRecipeBreakfast));
                        breakfastsSelected.AddRange(recipesBreakfast.Take(7 - countRecipeBreakfast));
                    }
                    else
                    {
                        breakfastsSelected.AddRange(recipesBreakfast.Take(7));
                    }
                }
                    

                while (lunchesSelected.Count() < 7) 
                {
                    if (countRecipeLunch < 7)
                    {
                        lunchesSelected.AddRange(recipesLunch.Take(countRecipeLunch));
                        lunchesSelected.AddRange(recipesLunch.Take(7 - countRecipeLunch));
                    }
                    else
                    {
                        lunchesSelected.AddRange(recipesLunch.Take(7));
                    }
                }


                while (dinnersSelected.Count() < 7)
                {
                    if (countRecipeDinner < 7)
                    {
                        dinnersSelected.AddRange(recipesDinner.Take(countRecipeDinner));
                        dinnersSelected.AddRange(recipesDinner.Take(7 - countRecipeDinner));
                    }
                    else
                    {
                        dinnersSelected.AddRange(recipesDinner.Take(7));
                    }
                }
                    

                Dictionary<string, JsonObjects.Get.RecipeData> descRecipe = new();
                List<JsonObjects.Search.Recipe> allSelected = new();
                allSelected.AddRange(breakfastsSelected);
                allSelected.AddRange(dinnersSelected);
                allSelected.AddRange(lunchesSelected);
                allSelected = allSelected.GroupBy(r => r.recipe_id)
                         .Select(grp => grp.First())
                         .ToList();

                foreach (var item in allSelected) 
                {
                    var resDescRecipe = await _fatSecretApi.GetRecipeDesc(AccessTokenHandler.GetAccessTokenValue(accessToken), item.recipe_id);
                    if (resDescRecipe == null || resDescRecipe.Contains(tokenInvalidCommunication))
                    {
                        throw new Exception("Expired or null value in res");
                    }

                    JsonObjects.Get.RecipeData recipeResponseDesc = JsonConvert.DeserializeObject<JsonObjects.Get.RecipeData>(resDescRecipe);
                    descRecipe.Add(recipeResponseDesc.recipe.recipe_id, recipeResponseDesc);
                }


                //Add recipe object cretor
                for (int i = 0; i < 7; i++)
                {
                    var item = breakfastsSelected[i];
                    var descItem = descRecipe[item.recipe_id];
                    Domain.Entities.Recipe recipeTmp = new Domain.Entities.Recipe
                    {
                        DayOfTheWeek = i + 1,
                        DishType="Breakfast",
                        Name = item.recipe_name,
                        Description=item.recipe_description,
                        Calories= Double.Parse(item.recipe_nutrition.calories),
                        Carbohydrate = Double.Parse(item.recipe_nutrition.carbohydrate),
                        Fat = Double.Parse(item.recipe_nutrition.fat),
                        Protein = Double.Parse(item.recipe_nutrition.protein),
                        Cholesterol = Double.Parse(descItem.recipe.serving_sizes.serving.cholesterol),
                        Iron = Double.Parse(descItem.recipe.serving_sizes.serving.iron),
                        Sugar = Double.Parse(descItem.recipe.serving_sizes.serving.sugar),
                        TransFat = Double.Parse(descItem.recipe.serving_sizes.serving.trans_fat),
                        Ingredients = item.recipe_ingredients.ingredient,
                        DietFormId = dietForm.Id
                    };
                    _recipeRepository.Add(recipeTmp);
                    if (descItem.recipe.directions.direction.Count() > 0) 
                    {
                        foreach (var itemDirection in descItem.recipe.directions.direction) 
                        {
                            Domain.Entities.RecipeInstruction recipeInstruction = new Domain.Entities.RecipeInstruction
                            {
                                Instruction = itemDirection.direction_description,
                                Order = int.Parse(itemDirection.direction_number),
                                RecipeId = recipeTmp.Id
                            };
                            _recipeInstructionRepository.Add(recipeInstruction);
                        }
                    }
                }

                for (int i = 0; i < 7; i++)
                {
                    var item = lunchesSelected[i];
                    var descItem = descRecipe[item.recipe_id];
                    Domain.Entities.Recipe recipeTmp = new Domain.Entities.Recipe
                    {
                        DayOfTheWeek = i + 1,
                        DishType = "Lunch",
                        Name = item.recipe_name,
                        Description = item.recipe_description,
                        Calories = Double.Parse(item.recipe_nutrition.calories),
                        Carbohydrate = Double.Parse(item.recipe_nutrition.carbohydrate),
                        Fat = Double.Parse(item.recipe_nutrition.fat),
                        Protein = Double.Parse(item.recipe_nutrition.protein),
                        Cholesterol = Double.Parse(descItem.recipe.serving_sizes.serving.cholesterol),
                        Iron = Double.Parse(descItem.recipe.serving_sizes.serving.iron),
                        Sugar = Double.Parse(descItem.recipe.serving_sizes.serving.sugar),
                        TransFat = Double.Parse(descItem.recipe.serving_sizes.serving.trans_fat),
                        Ingredients = item.recipe_ingredients.ingredient,
                        DietFormId = dietForm.Id
                    };
                    _recipeRepository.Add(recipeTmp);
                    if (descItem.recipe.directions.direction.Count() > 0)
                    {
                        foreach (var itemDirection in descItem.recipe.directions.direction)
                        {
                            Domain.Entities.RecipeInstruction recipeInstruction = new Domain.Entities.RecipeInstruction
                            {
                                Instruction = itemDirection.direction_description,
                                Order = int.Parse(itemDirection.direction_number),
                                RecipeId = recipeTmp.Id
                            };
                            _recipeInstructionRepository.Add(recipeInstruction);
                        }
                    }
                }

                for (int i = 0; i < 7; i++)
                {
                    var item = dinnersSelected[i];
                    var descItem = descRecipe[item.recipe_id];
                    Domain.Entities.Recipe recipeTmp = new Domain.Entities.Recipe
                    {
                        DayOfTheWeek = i + 1,
                        DishType = "Dinner",
                        Name = item.recipe_name,
                        Description = item.recipe_description,
                        Calories = Double.Parse(item.recipe_nutrition.calories),
                        Carbohydrate = Double.Parse(item.recipe_nutrition.carbohydrate),
                        Fat = Double.Parse(item.recipe_nutrition.fat),
                        Protein = Double.Parse(item.recipe_nutrition.protein),
                        Cholesterol = Double.Parse(descItem.recipe.serving_sizes.serving.cholesterol),
                        Iron = Double.Parse(descItem.recipe.serving_sizes.serving.iron),
                        Sugar = Double.Parse(descItem.recipe.serving_sizes.serving.sugar),
                        TransFat = Double.Parse(descItem.recipe.serving_sizes.serving.trans_fat),
                        Ingredients = item.recipe_ingredients.ingredient,
                        DietFormId = dietForm.Id
                    };
                    _recipeRepository.Add(recipeTmp);
                    if (descItem.recipe.directions.direction.Count() > 0)
                    {
                        foreach (var itemDirection in descItem.recipe.directions.direction)
                        {
                            Domain.Entities.RecipeInstruction recipeInstruction = new Domain.Entities.RecipeInstruction
                            {
                                Instruction = itemDirection.direction_description,
                                Order = int.Parse(itemDirection.direction_number),
                                RecipeId = recipeTmp.Id
                            };
                            _recipeInstructionRepository.Add(recipeInstruction);
                        }
                    }
                }

                _userRepository.UpdateUserDietStatus(user, PreparingStatus.Finished);
            }
            catch (Exception e)
            {
                Console.WriteLine("EXCEPTION WHILE GENERATING DIETS");
                Console.WriteLine(e.StackTrace);
                Console.WriteLine(e.Message);
            }
        }
    }

}
