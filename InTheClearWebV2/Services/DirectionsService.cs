using System;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using InTheClearWebV2.Models;
using System.Text;
using Newtonsoft.Json.Linq;

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

            var response = new Dictionary<string, string>
            {
                {"points", JsonConvert.SerializeObject(content.routes[0].overview_polyline.points)},
                {"steps", Convert.ToString(content.routes[0].legs[0].steps)}
            };
            
            return response;
        }

        public async Task<Dictionary<string, string>> processNamesAndWeather(Route[] route)
        {
            var request = new Dictionary<string, Route[]>{
                { "List", route}
            };

            var stringContent = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            Task<string> weather = processWeather(stringContent);
            Task<string> names = processNames(stringContent);
 
            await Task.WhenAll(weather, names);

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
                url += $"waypoint{i}={route[i].Lat}%2C{route[i].Long}&";
            }

            url += $"mode=fastest;car&app_id={appId}&app_code={appCode}";

            var timeResponse = await client.GetStringAsync(url);

            var content = JsonConvert.DeserializeObject<dynamic>(timeResponse);

            var response = new List<Dictionary<string, string>>();
            
            foreach (var item in content.response.route[0].leg)
            {
                var responseItem = new Dictionary<string, string>();
                responseItem.Add("pos", JsonConvert.SerializeObject(item.start.mappedPosition));
                responseItem.Add("time", JsonConvert.SerializeObject(item.travelTime));

                response.Add(responseItem);
            }

            return response;

        }

        private async Task<string> processWeather(StringContent route)
        {
            var key = Environment.GetEnvironmentVariable("AWS_KEY");
            var url = $"https://{key}.execute-api.us-east-1.amazonaws.com/Prod/weather";

            return await lambdaRequest(route, url);

        }

        private async Task<string> processNames(StringContent route)
        {
            var key = Environment.GetEnvironmentVariable("AWS_KEY");
            var url = $"https://{key}.execute-api.us-east-1.amazonaws.com/Prod/reveresegeocode";

            return await lambdaRequest(route, url);

        }

        private async Task<string> lambdaRequest(StringContent route, string url)
        {
            var weatherResponse = await client.PostAsync(url, route);
            var contents = weatherResponse.Content.ReadAsStringAsync().Result;

            return contents;
        }
    }
}
