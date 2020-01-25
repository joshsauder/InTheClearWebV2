using System;
using System.Collections.Generic;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public class LocationService : ILocationService 
    {
        private readonly LocationRepository respository;

        public LocationService(LocationRepository _respository)
        {
            respository = _respository;
        }

        public void AddLocations(Location[] locations)
        {
            var postLocations = new List<Location>();
            var guid = Guid.NewGuid();
            foreach(var location in locations)
            {
                location.TripId = guid;
                location.CreatedAt = DateTime.Now;
                postLocations.Add(location);
            }

            respository.AddLocations(locations);
        } 
    }
}
