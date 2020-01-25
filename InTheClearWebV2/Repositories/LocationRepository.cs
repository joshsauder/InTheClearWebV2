using System;
using System.Collections.Generic;
using System.Linq;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class LocationRepository : ILocationReposity
    {

        private readonly EntityContext context;

        public LocationRepository(EntityContext _context)
        {
            context = _context;
        }

        public void AddLocations(Location[] locations)
        {
            context.Locations.AddRange(locations);
            context.SaveChanges();
        }

        public List<Location> GetTrip(int UserId, Guid tripId)
        {
            return context.Locations
                .Where(loc => loc.TripId == tripId && loc.UserId == UserId)
                .OrderBy(loc => loc.Id)
                .ToList();
              
        }
    }
}
