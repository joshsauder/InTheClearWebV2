using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;
using InTheClearWebV2.Repositories;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private LocationService service;
   

        public LocationController(LocationRepository context)
        {
            service = new LocationService(context);
            
        }


        //POST: api/Locations
        [HttpPost]
        public void PostLocations(Location[] location)
        {
            service.AddLocations(location);

        }
    }
}