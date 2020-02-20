using System;
using InTheClearWebV2.Models;
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
                user.Id = System.Guid.NewGuid();
                user.CreatedAt = DateTime.Now;
                user.UpdatedAt = DateTime.Now;
                repository.CreateUser(user);
                return fromUserToResponse(user);
            }
        
            updatePaid(user, foundUser);
            return fromUserToResponse(foundUser);
        }

        private void updatePaid(User user, User foundUser){

            if(user.Paid == true && foundUser.Paid == false){
                foundUser.Paid = true;
                repository.updatePaid(user.Email);
            }
        }


        private UserResponse fromUserToResponse(User user)
        {
            return new UserResponse()
            {
                Id = user.Id.ToString(),
                DisplayName = user.DisplayName,
                Email = user.Email,
                Paid = user.Paid,
            };
            
        }


    }
}
