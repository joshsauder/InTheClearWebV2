using System;
using System.Threading.Tasks;
using InTheClearWebV2.Models;
using InTheClearWebV2.ViewModal;

namespace InTheClearWebV2.Services
{
    public interface IUserService
    {
        public void CreateUser(User user);
        public UserResponse FindUser(User user);
        public Task<UserResponse> GoogleUser(string token, bool paid);
    }
}
