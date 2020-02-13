using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public interface IUserService
    {
        public UserResponse AuthUser(User user);
    }
}
