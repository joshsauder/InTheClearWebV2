using System;
using System.Threading.Tasks;
using InTheClearWebV2.Models;
using InTheClearWebV2.ViewModal;

namespace InTheClearWebV2.Services
{
    public interface IUserService
    {
        public UserResponse AuthUser(User user);
    }
}
