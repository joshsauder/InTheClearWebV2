using System;
using System.Collections.Generic;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public class LocationService 
    {
        private readonly LocationRepository respository;

        public LocationService(LocationRepository context)
        {
            respository = context;
        }

        public void AddLocations(Location[] locations)
        {
            var postLocations = new List<Location>();
            foreach(var location in locations)
            {
                location.CreatedAt = DateTime.Now;
                postLocations.Add(location);
            }

            respository.AddRange(postLocations);
            respository.SaveChanges();
        } 
    }
}
