using System;
using System.Text;
using InTheClearWebV2.Models;
using InTheClearWebV2.ViewModal;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Google.Apis.Auth;
using System.Threading.Tasks;

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
            var foundUser = repository.FindUser(user.Id);

            if (foundUser == null)
            {
                repository.CreateUser(user);
                fromUserToResponse(user, createToken(user.Id));
            }

            return fromUserToResponse(foundUser, createToken(user.Id));
        }

        private string createToken(String Id)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Need_to_change_to_something_much_larger");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, Id)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private UserResponse fromUserToResponse(User user, string token)
        {
            return new UserResponse()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                Email = user.Email,
                Paid = user.Paid,
                Token = token
            };
            
        }


    }
}
