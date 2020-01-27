using System;
using System.Linq;
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

namespace InTheClearWebV2.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repository;

        public UserService(IUserRepository _repository)
        {
            repository = _repository;
        }


        public void CreateUser(User user)
        {
            var password = generateHash(user.Password);
            user.Password = password.Item2;
            user.Salt = password.Item1;

            user.CreatedAt = DateTime.Now;

            repository.CreateUser(user);
        }

        public UserResponse FindUser(User user)
        {
            var foundUser = repository.FindUser(user.Email);

            if (compareHash(user.Password, foundUser.Password, foundUser.Salt))
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
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Need_to_change_to_something_much_larger");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, Id.ToString())
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
                LastName = user.LastName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                Token = token
            };
            
        }

        private (byte[], string) generateHash(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
               password: password,
               salt: salt,
               prf: KeyDerivationPrf.HMACSHA1,
               iterationCount: 10000,
               numBytesRequested: 256 / 8));

            return (salt, hashedPassword);
        }

        private bool compareHash(string password, string hash, byte[] salt)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
              password: password,
              salt: salt,
              prf: KeyDerivationPrf.HMACSHA1,
              iterationCount: 10000,
              numBytesRequested: 256 / 8));

            return hashedPassword.Equals(hash);
        }

    }
}
