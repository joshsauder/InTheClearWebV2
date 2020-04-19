using System;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService service;
   
        
        public TripController(ITripService _service)
        {
            service = _service;
            
        }


        //POST: api/Locations
        [HttpPost]
        [Authorize]
        public void PostLocations(Trip trip)
        {
            service.AddTrip(trip);

        }

        //GET: api/Trip
        [HttpGet]
        [Authorize]
        public List<Trip> GetTrips(Guid id)
        {
            return service.GetTrips(id);

        }

    }
}