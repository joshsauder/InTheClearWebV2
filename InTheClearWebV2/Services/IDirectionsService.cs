using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InTheClearWebV2.Models;
using Microsoft.AspNetCore.Mvc;

namespace InTheClearWebV2.Services
{
    public interface IDirectionsService
    {
        public Task<Dictionary<string, string>> processDirections(string start, string end);
        public Task<Dictionary<string, string>> processNamesAndWeather(Route[] route);
        public ActionResult processTripTimes();
    }
}
