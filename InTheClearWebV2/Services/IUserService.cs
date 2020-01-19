using System;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public interface IUserService
    {
        public void CreateUser(User user);
        public User FindUser(User user);
        public void checkAuth(User user);
    }
}
