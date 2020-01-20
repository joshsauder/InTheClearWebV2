using System;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using InTheClearWebV2.Models;
using System.Text;

namespace InTheClearWebV2.Services
{
    public class DirectionsService : IDirectionsService
    {
        public DirectionsService()
        {
        }

        private static readonly HttpClient client = new HttpClient();

        public async Task<Dictionary<string, string>> processDirections(string start, string end)
        {
            var key = Environment.GetEnvironmentVariable("GOOGLE_MAPS_KEY");
            var url = $"https://maps.googleapis.com/maps/api/directions/json?origin={start}&destination={end}&mode=driving&key={key}";

            var googleResponse = await client.GetStringAsync(url);

            var content = JsonConvert.DeserializeObject<dynamic>(googleResponse);
            Console.WriteLine(content.routes[0].overview_polyline.points);
            Console.WriteLine(content.routes[0].legs[0].steps);

            var response = new Dictionary<string, string>
            {
                {"points", JsonConvert.ToString(content.routes[0].overview_polyline.points)},
                {"steps", JsonConvert.ToString(content.routes[0].legs[0].steps)}
            };

            return response;
        }

        public async Task<Dictionary<string, string>> processNamesAndWeather(Route[] route)
        {
            var request = new Dictionary<string, Route[]>{
                { "List", route}
            };

            Task<string> weather = processWeather(request);
            Task<string> names = processNames(request);
 
            var results = await Task.WhenAll(weather, names);

            var response = new Dictionary<string, string>
            {
                {"weather", await weather },
                {"locations", await names }
            };

            return response;
            
        }

        public async Task<List<Dictionary<string, string>>> processTripTimes(Route[] route)
        {
            var appId = Environment.GetEnvironmentVariable("HERE_APP_ID");
            var appCode = Environment.GetEnvironmentVariable("HERE_APP_CODE");
            var url = "https://route.api.here.com/routing/7.2/calculateroute.json?";

            for(int i = 0; i< route.Length; i++)
            {
                url += $"waypoint{i}=${route[i].Lat}%2C${route[i].Long}&";
            }

            url += $"mode=fastest;car&app_id={appId}&app_code={appCode}";

            var timeResponse = await client.GetStringAsync(url);

            var content = JsonConvert.DeserializeObject<dynamic>(timeResponse);

            var response = new List<Dictionary<string, string>>();
            foreach (var item in content.route[0].leg)
            {
                var responseItem = new Dictionary<string, string>();
                responseItem.Add("pos", item.start.mappedPosition);
                responseItem.Add("time", item.travelTime);

                response.Add(responseItem);
            }

            return response;

        }

        private async Task<string> processWeather(Dictionary<string, Route[]> route)
        {
            var key = Environment.GetEnvironmentVariable("AWS_KEY");
            var url = $"https://{key}.execute-api.us-east-1.amazonaws.com/Prod/weather";
            Console.WriteLine(JsonConvert.SerializeObject(route));

            var stringContent = new StringContent(JsonConvert.SerializeObject(route), Encoding.UTF8, "application/json");
            var weatherResponse = await client.PostAsync(url, stringContent);

            var contents = weatherResponse.Content.ReadAsStringAsync().Result;

            return contents;

        }

        private async Task<string> processNames(Dictionary<string, Route[]> route)
        {
            var key = Environment.GetEnvironmentVariable("AWS_KEY");
            var url = $"https://{key}.execute-api.us-east-1.amazonaws.com/Prod/reveresegeocode";

            var stringContent = new StringContent(JsonConvert.SerializeObject(route), Encoding.UTF8, "application/json");
            var weatherResponse = await client.PostAsync(url, stringContent);

            var contents = weatherResponse.Content.ReadAsStringAsync().Result;

            return contents;

        }
    }
}
