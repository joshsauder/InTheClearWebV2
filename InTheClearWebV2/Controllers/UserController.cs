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
        [Authorize]
        public IActionResult CreateUser(User user)
        {
            return Ok()

        }

        [HttpPost]
        [Route("Auth")]
        [AllowAnonymous]
        public IActionResult FindUser(User user)
        {
            try
            {
                var token = service.FindUser(user);

                if (token == null)
                {
                    return NotFound();
                }

                return Ok(user);

                
            } catch (UserPasswordIncorrectException e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}