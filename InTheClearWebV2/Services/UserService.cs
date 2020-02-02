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


        public void CreateUser(User user)
        {
            var password = generateHash(user.Password);
            user.Password = password.Item2;
            user.Salt = password.Item1;

            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;

            repository.CreateUser(user);
        }

        public UserResponse FindUser(User user)
        {
            var foundUser = repository.FindUser(user.Email);

            if (foundUser == null)
            {
                return null;

            }

            if (compareHash(user.Password, foundUser.Password, foundUser.Salt))
            {
                var token = createToken(foundUser.Id);
                return fromUserToResponse(foundUser, token); 
            }
            else
            {
                string message = "Password is incorrect - " + user.Password;
                throw new UserPasswordIncorrectException(message);
            }
        }

        public async Task<UserResponse> GoogleUser(string token, bool paid)
        {

            User user = await authenticateGoogle(token);
            var foundUser = repository.FindUser(user.Email);

            if(foundUser == null)
            {
                user.CreatedAt = DateTime.Now;
                user.UpdatedAt = DateTime.Now;
                user.Paid = paid;

                repository.CreateUser(user);

                foundUser = repository.FindUser(user.Email);
            }

            var userToken = createToken(foundUser.Id);
            return fromUserToResponse(foundUser, userToken);
        }

        private string createToken(long Id)
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


        private async Task<User> authenticateGoogle(string token)
        {
            GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token);

            return new User()
            {
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
                Email = payload.Email
            };
        }

        private UserResponse fromUserToResponse(User user, string token)
        {
            return new UserResponse()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Paid = user.Paid,
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
