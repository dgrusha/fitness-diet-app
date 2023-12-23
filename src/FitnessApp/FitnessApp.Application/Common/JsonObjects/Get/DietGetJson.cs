using System;
using System.Collections.Generic;

namespace FitnessApp.Application.Common.JsonObjects.Get;

public class Direction
{
    public string direction_description { get; set; }
    public string direction_number { get; set; }
}

public class Directions
{
    public List<Direction> direction { get; set; }
}

public class Ingredient
{
    public string food_id { get; set; }
    public string food_name { get; set; }
    public string ingredient_description { get; set; }
    public string ingredient_url { get; set; }
    public string measurement_description { get; set; }
    public string number_of_units { get; set; }
    public string serving_id { get; set; }
}

public class Ingredients
{
    public List<Ingredient> ingredient { get; set; }
}

public class RecipeCategory
{
    public string recipe_category_name { get; set; }
    public string recipe_category_url { get; set; }
}

public class RecipeCategories
{
    public List<RecipeCategory> recipe_category { get; set; }
}

public class RecipeImages
{
    public List<string> recipe_image { get; set; }
}

public class ServingSize
{
    public string calcium { get; set; }
    public string calories { get; set; }
    public string carbohydrate { get; set; }
    public string cholesterol { get; set; }
    public string fat { get; set; }
    public string fiber { get; set; }
    public string iron { get; set; }
    public string monounsaturated_fat { get; set; }
    public string polyunsaturated_fat { get; set; }
    public string potassium { get; set; }
    public string protein { get; set; }
    public string saturated_fat { get; set; }
    public string serving_size { get; set; }
    public string sodium { get; set; }
    public string sugar { get; set; }
    public string trans_fat { get; set; }
    public string vitamin_a { get; set; }
    public string vitamin_c { get; set; }
}

public class ServingSizes
{
    public ServingSize serving { get; set; }
}

public class Recipe
{
    public string cooking_time_min { get; set; }
    public Directions directions { get; set; }
    public string grams_per_portion { get; set; }
    public Ingredients ingredients { get; set; }
    public string number_of_servings { get; set; }
    public string preparation_time_min { get; set; }
    public RecipeCategories recipe_categories { get; set; }
    public string recipe_description { get; set; }
    public string recipe_id { get; set; }
    public RecipeImages recipe_images { get; set; }
    public string recipe_name { get; set; }
    public RecipeTypes recipe_types { get; set; }
    public string recipe_url { get; set; }
    public ServingSizes serving_sizes { get; set; }
}

public class RecipeData
{
    public Recipe recipe { get; set; }
}

public class RecipeTypes
{
    public List<string> recipe_type { get; set; }
}
