using System;
using System.Collections.Generic;
using System.Linq;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class LocationRepository : ILocationRepository
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
    }
}
