using System;
using System.Linq;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

namespace InTheClearWebV2.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly EntityContext context;

        public UserRepository(EntityContext _context)
        {
            context = _context;
        }

        public void CreateUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User FindUser(string email)
        {
            return context.Users
                .SingleOrDefault(user => user.Email == email);
        }
    }
}
