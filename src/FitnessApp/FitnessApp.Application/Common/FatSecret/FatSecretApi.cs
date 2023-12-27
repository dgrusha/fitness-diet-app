using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.DTO;
using Microsoft.Extensions.Configuration;

namespace FitnessApp.Application.Common.FatSecret;
public class FatSecretApi : IFatSecretApi
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _apiUrl;
    private readonly string _recipesMethod;
    private readonly string _recipesDescMethod;
    private readonly string _format;

    public FatSecretApi(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _apiUrl = "https://platform.fatsecret.com/rest/server.api";
        _recipesMethod = "recipes.search.v3";
        _recipesDescMethod = "recipe.get.v2";
        _format = "json";
    }

    public async Task<string> Authenticate()
    {
        string authUrl = "https://oauth.fatsecret.com/connect/token";
        string? pass = _configuration.GetValue<string>("FatSecret:Password");
        string? username = _configuration.GetValue<string>("FatSecret:Username");
        if (pass == null || username == null)
        {
            return await Task.FromResult(string.Empty);
        }

        var byteArray = Encoding.ASCII.GetBytes($"{username}:{pass}");
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

        var values = new Dictionary<string, string>
        {
           { "scope", "basic" },
           { "grant_type", "client_credentials" }
        };
        var content = new FormUrlEncodedContent(values);
        var response = await _httpClient.PostAsync("https://oauth.fatsecret.com/connect/token", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        if (responseBody == null)
        {
            responseBody = "";
        }

        return await Task.FromResult(responseBody);
        
    }

    public async Task<string> GetRecipeDesc(string accessToken, string id)
    {
        var requestUrl = $"{_apiUrl}?method={_recipesDescMethod}&format=json&recipe_id={id}";
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _httpClient.GetAsync(requestUrl);
        if (response.IsSuccessStatusCode)
        {
            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }
        else
        {
            return string.Empty;
        }
    }

    public async Task<string> GetRecipes(string accessToken, CalorieRangeDto calories, Domain.Entities.CookingRange cookingRange, string typeRecipe)
    {
        var requestUrl = $"{_apiUrl}?method={_recipesMethod}&format={_format}&calories.from={calories.CalorieStart}&calories.to={calories.CalorieEnd}&recipe_types={typeRecipe}";
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _httpClient.GetAsync(requestUrl);
        if (response.IsSuccessStatusCode)
        {
            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }
        else
        {
            return string.Empty;
        }
    }
}
