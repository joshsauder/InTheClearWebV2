using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;
using InTheClearWebV2.Exceptions;
using Microsoft.AspNetCore.Authorization;

namespace InTheClearWebV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        [AllowAnonymous]
        public  IActionResult FindUser(User user)
        {
            try
            {
                var userResponse = service.FindUser(user);

                if (userResponse == null)
                {
                    return NotFound();
                }

                return Ok(userResponse);

                
            } catch (UserPasswordIncorrectException e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}