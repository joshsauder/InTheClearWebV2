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

        public void UpdatePaid(string email)
        {
            var query = 
                (from user in context.Users
                where user.Email == email
                select user).First();
            query.Paid = true;

            context.SaveChanges();
        }

        public bool CheckPaid(Guid userId)
        {
            return (from user in context.Users
                where user.Id == userId
                select user.Paid).First();
        }
    }
}
