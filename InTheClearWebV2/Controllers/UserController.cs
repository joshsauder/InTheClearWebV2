using System;
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

        [HttpGet]
        [Authorize]
        public IActionResult checkAuth()
        {
            return Ok();
        }

        [HttpPost]
        [Route("Auth")]
        [Authorize]
        public IActionResult FindUser(User user)
        {
            try
            {
                var userResponse = service.AuthUser(user);

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

        [HttpGet]
        [Route("Paid")]
        [Authorize]
        public IActionResult CheckPaid(Guid userId)
        {
            var paid = service.CheckPaid(userId);

            if(!paid)
            {
                return NotFound(); 
            }

            return Ok();
        }
    }
}