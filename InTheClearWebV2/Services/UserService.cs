using System;
using System.Linq;
using InTheClearWebV2.Models;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Exceptions;

namespace InTheClearWebV2.Services
{
    public class UserService : IUserService
    {
        private readonly UserRepository repository;

        public UserService(UserRepository _repository)
        {
            repository = _repository;
        }

        public void checkAuth(User user)
        {
            throw new NotImplementedException();
        }

        public void CreateUser(User user)
        {
            repository.Add(user);
            repository.SaveChanges();
        }

        public User FindUser(User user)
        {
            var foundUser = repository.users.Single(temp => temp.Email == user.Email);

            if (String.Compare(foundUser.Password, user.Password) < 0)
            {
                string message = "Password is incorrect - " + user.Password;
                throw new UserPasswordIncorrectException(message);
            }

            return foundUser;
        }
    }
}
