using System;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Repositories
{
    public interface IUserRepository
    {
        public void CreateUser(User user); 
        public User FindUser(String email);
        public void UpdatePaid(string email);
        public bool CheckPaid(Guid userId);

    }
}
