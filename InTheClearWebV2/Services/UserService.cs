using System;
using System.Text;
using InTheClearWebV2.Models;
using InTheClearWebV2.ViewModal;
using InTheClearWebV2.Repositories;

namespace InTheClearWebV2.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repository;

        public UserService(IUserRepository _repository)
        {
            repository = _repository;
        }


        public UserResponse AuthUser(User user)
        {
            return FindUser(user);
        }

        private UserResponse FindUser(User user)
        {
            var foundUser = repository.FindUser(user.Email);

            if (foundUser == null)
            {
                user.CreatedAt = DateTime.Now;
                user.UpdatedAt = DateTime.Now;
                repository.CreateUser(user);
                fromUserToResponse(user);
            }

            return fromUserToResponse(foundUser);
        }

        private UserResponse fromUserToResponse(User user)
        {
            return new UserResponse()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                Email = user.Email,
                Paid = user.Paid,
            };
            
        }


    }
}
