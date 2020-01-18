using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService service;
   

        public LocationController(ILocationService _service)
        {
            service = _service;
            
        }


        //POST: api/Locations
        [HttpPost]
        public void PostLocations(Location[] location)
        {
            service.AddLocations(location);

        }
    }
}