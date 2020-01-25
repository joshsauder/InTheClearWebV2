using System;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class EntityContext : DbContext
    {
        public EntityContext(DbContextOptions<EntityContext> options) : base(options)
        { }

        public DbSet<Location> Locations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
