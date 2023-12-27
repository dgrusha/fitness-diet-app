using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace FitnessApp.Application.Common.NinjaApi;
public class NinjaApi : INinjaApi
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string? _apiKey;

    public NinjaApi(IConfiguration configuration, HttpClient httpClient)
    {
        _configuration = configuration;
        _httpClient = httpClient;
        _apiKey = _configuration.GetValue<string>("NinjaApi:X-Api-Key");
        _httpClient.DefaultRequestHeaders.Add("X-Api-Key", _apiKey);
    }

    public async Task<string> GetExcercises(string muscle, Domain.Entities.TrainingMode trainingMode)
    {
        string excercisesUrl = $"https://api.api-ninjas.com/v1/exercises?muscle={muscle.ToLower()}&&difficulty={trainingMode.Name.ToLower()}";
        try
        {
            var response = await _httpClient.GetAsync(excercisesUrl);
            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                return responseBody;
            }
            else
            {
                Console.WriteLine(response.Content);
                Console.WriteLine(response.ToString());
                Console.WriteLine();
                return string.Empty;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error while fetching NinjaApi appeared: {e.Message}");
            return string.Empty;
        }
        
        throw new NotImplementedException();
    }
}
