using System;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class LocationRepository : DbContext
    {

        public LocationRepository(DbContextOptions<LocationRepository> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Location> locations { get; set; }
    }
}
