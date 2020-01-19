using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;
using InTheClearWebV2.Exceptions;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService service;

        public UserController(IUserService _service)
        {
            service = _service;
        }

        [HttpPost]
        [Route("")]
        public void CreateUser(User user)
        {
            service.CreateUser(user);

        }

        [HttpPost]
        [Route("Auth")]
        public async Task<ActionResult<User>> FindUser(User user)
        {
            try
            {
                var found = service.FindUser(user);

                if (found == null)
                {
                    return NotFound();
                }

                return found;
            } catch (UserPasswordIncorrectException e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}