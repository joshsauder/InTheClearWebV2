using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectionsController : ControllerBase
    {
        private readonly IDirectionsService service;


        public DirectionsController(IDirectionsService _service)
        {
            service = _service;

        }

        [HttpGet]
        public async Task<Dictionary<string, string>> getDirections(string start, string end)
        {
            return await service.processDirections(start, end);

        }

        [HttpPost]
        [Route("Info")]
        public async Task<Dictionary<string, string>> getCityNamesAndWeather(Route[] route)
        {
            return await service.processNamesAndWeather(route);
        }

        [HttpPost]
        [Route("Times")]
        public async Task<List<Dictionary<string, string>>> getTripTimes(Route[] route)
        {

            return await service.processTripTimes(route);
        }

    }
}