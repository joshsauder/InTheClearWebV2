using System;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class UserRepository : DbContext
    {
        public UserRepository(DbContextOptions<UserRepository> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> users { get; set; }

    }
}
