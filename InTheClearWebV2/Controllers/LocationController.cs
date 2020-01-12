using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly LocationRepository _context;

        public LocationController(LocationRepository context)
        {
            _context = context;
        }

        //POST: api/Locations
        [HttpPost]
        public void PostLocations(Location location)
        {
            _context.Add(location);
            _context.SaveChanges();

        }
    }
}