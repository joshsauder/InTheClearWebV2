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
            var url = $"https://maps.googleapis.com/maps/api/directions/json?origin={start}&destination={end}&mode=driving&key={key}";

            var googleResponse = await client.GetStringAsync(url);

            var content = JsonConvert.DeserializeObject<dynamic>(googleResponse);

            var response = new Dictionary<string, string>
            {
                {"points", content.routes[0].overview_polyline.points},
                {"steps", content.routes[0].legs[0].steps}
            };

            return response;
        }

        public async Task<Dictionary<string, string>> processNamesAndWeather(Route[] route)
        {
            Task<string> weather = processWeather(route);
            Task<string> names = processNames(route);

            var results = await Task.WhenAll(weather, names);

            var response = new Dictionary<string, string>
            {
                {"weather", await weather },
                {"locations", await names }
            };

            return response;
            
        }

        public ActionResult processTripTimes()
        {
            throw new NotImplementedException();
        }

        private async Task<string> processWeather(Route[] route)
        {
            var url = $"https://{process.env.AWS_KEY}.execute-api.us-east-1.amazonaws.com/Prod/weather";

            var stringContent = new StringContent(JsonConvert.SerializeObject(route), Encoding.UTF8, "application/json");
            var weatherResponse = await client.PostAsync(url, stringContent);

            var contents = weatherResponse.Content.ReadAsStringAsync().Result;

            return contents;

        }

        private async Task<string> processNames(Route[] route)
        {
            var url = $"https://${process.env.AWS_KEY}.execute-api.us-east-1.amazonaws.com/Prod/reveresegeocode";

            var stringContent = new StringContent(JsonConvert.SerializeObject(route), Encoding.UTF8, "application/json");
            var weatherResponse = await client.PostAsync(url, stringContent);

            var contents = weatherResponse.Content.ReadAsStringAsync().Result;

            return contents;

        }
    }
}
