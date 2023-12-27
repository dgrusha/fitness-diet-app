using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FitnessApp.Application.Common.JsonObjects.Search;
public class RecipeResponse
{
    public Recipes recipes { get; set; }
}

public class Recipes
{
    public string max_result { get; set; }
    public string page_number { get; set; }
    public List<Recipe> recipe { get; set; }
}

public class Recipe
{
    public string recipe_description { get; set; }
    public string recipe_id { get; set; }
    public string recipe_image { get; set; }
    public RecipeIngredients recipe_ingredients { get; set; }
    public string recipe_name { get; set; }
    public RecipeNutrition recipe_nutrition { get; set; }
    public RecipeTypes recipe_types { get; set; }
}

public class RecipeIngredients
{
    public List<string> ingredient { get; set; }
}

public class RecipeNutrition
{
    public string calories { get; set; }
    public string carbohydrate { get; set; }
    public string fat { get; set; }
    public string protein { get; set; }
}

public class RecipeTypes
{
    public List<string> recipe_type { get; set; }
}