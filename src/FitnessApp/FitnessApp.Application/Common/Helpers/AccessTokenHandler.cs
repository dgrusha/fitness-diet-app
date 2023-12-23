using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FitnessApp.Application.Common.Helpers;
public class AccessTokenHandler
{
    public static string? LoadAccessToken(string TokenFileName)
    {
        if (File.Exists(TokenFileName))
        {
            return File.ReadAllText(TokenFileName);
        }
        return null;
    }

    public static string? GetAccessTokenValue(string TokenJson)
    {
        JObject json = JObject.Parse(TokenJson);
        return json["access_token"].ToString(); ;
    }

    public static bool IsExpired(string accessToken) 
    {
        JObject json = JObject.Parse(accessToken);
        string? expirationDate = json["expiration_date"].ToString();
        DateTime expirationDateObject = DateTime.Parse(expirationDate);
        return expirationDateObject.AddMinutes(-10) <= DateTime.Now; 
    }

    public static void SaveAccessToken(string TokenFileName, string accessToken)
    {
        if (!string.IsNullOrEmpty(TokenFileName) && !string.IsNullOrEmpty(accessToken)) 
        {
            JObject json = JObject.Parse(accessToken);
            string? expiration = json["expires_in"].ToString();
            if (!string.IsNullOrEmpty(expiration)) 
            {
                int expirationNumeric = Convert.ToInt32(expiration);
                DateTime dateTime = DateTime.Now.AddSeconds(expirationNumeric);
                json["expiration_date"] = dateTime.ToString();
                File.WriteAllText(TokenFileName, json.ToString());
            }
        }
        
    }
}
