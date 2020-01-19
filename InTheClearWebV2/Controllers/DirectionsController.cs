using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;

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

        public async Task<Dictionary<string, string>> getDirections(string start, string end)
        {
            return await service.processDirections(start, end);

        }

        public ActionResult getCityNamesAndWeather()
        {

        }

        public ActionResult getTripTimes()
        {

        }

        private
    }
}