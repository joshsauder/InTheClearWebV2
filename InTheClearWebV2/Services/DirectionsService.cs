using System;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        public ActionResult processGeoCoordinates()
        {
            throw new NotImplementedException();
        }

        public ActionResult processTripTimes()
        {
            throw new NotImplementedException();
        }
    }
}
