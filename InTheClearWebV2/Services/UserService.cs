using System;
using System.Linq;
using System.Text;
using InTheClearWebV2.Models;
using InTheClearWebV2.ViewModal;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

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

        public void checkAuth(User user)
        {
            throw new NotImplementedException();
        }

        public void CreateUser(User user)
        {
            repository.Add(user);
            repository.SaveChanges();
        }

        public UserResponse FindUser(User user)
        {
            var foundUser = repository.users.Single(temp => temp.Email == user.Email);

            if (String.Compare(foundUser.Password, user.Password) < 0)
            {
                string message = "Password is incorrect - " + user.Password;
                throw new UserPasswordIncorrectException(message);
            }

            if(foundUser != null)
            {
                var token = createToken(foundUser.Id, foundUser.Email);
                return fromUserToResponse(foundUser, token);
            }else
            {
                return null;
            }
        }

        private string createToken(long Id, string email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Need_to_change_to_something_much_larger"));

            var signingCredentials = new SigningCredentials(securityKey, "HS256");
            var header = new JwtHeader(signingCredentials);

            var dateTimeOffset = new DateTimeOffset(DateTime.UtcNow);

            var payload = new JwtPayload
            {
                {"iat", dateTimeOffset.ToUnixTimeSeconds() },
                {"user", new Dictionary<string, string> {
                    {"email",  email},
                    {"id", Id.ToString() }
                }
                }
            };

            var securityToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();

            return handler.WriteToken(securityToken);
        }

        private UserResponse fromUserToResponse(User user, string token)
        {
            return new UserResponse()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                Token = token
            };
            
        }

    }
}
