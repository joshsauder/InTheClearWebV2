using System;
using System.Linq;
using System.Text;
using InTheClearWebV2.Models;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace InTheClearWebV2.Services
{
    public class UserService : IUserService
    {
        private readonly UserRepository repository;

        public UserService(UserRepository _repository)
        {
            repository = _repository;
        }

        public void CheckAuth(User user)
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

        private string createToken(long Id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Need to Change"));

            var signingCredentials = new SigningCredentials(securityKey, "HS256");
            var header = new JwtHeader(signingCredentials);

            var dateTimeOffset = new DateTimeOffset(DateTime.UtcNow);

            var payload = new JwtPayload
            {
                {"iat", dateTimeOffset.ToUnixTimeSeconds() },
                {"id", Id}
            };

            var securityToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();

            return handler.WriteToken(securityToken);
        }
    }
}
