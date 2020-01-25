using System;
using System.Collections.Generic;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Repositories
{
    public interface ILocationReposity
    {
        public void AddLocations(Location[] locations);
        public List<Location> GetTrip(int UserId, Guid tripId);
        
    }
}
