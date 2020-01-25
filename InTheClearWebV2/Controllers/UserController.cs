using System;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using InTheClearWebV2.Services;
using InTheClearWebV2.Models;
using InTheClearWebV2.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

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
        [Route("")]
        [AllowAnonymous]
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

                this.Response.Headers.Add("Authorization", "bearer " + userResponse.Token);

                return Ok(userResponse);

                
            } catch (UserPasswordIncorrectException e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}