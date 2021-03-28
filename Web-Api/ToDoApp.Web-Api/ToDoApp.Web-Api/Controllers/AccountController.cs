using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ToDoApp.Aplication.Models;
using ToDoApp.Aplication.Services;
using ToDoApp.Domain.Identity;
using ToDoApp.EFData;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtTokenService _jwtToken;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IJwtTokenService jwtToken)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtToken = jwtToken;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Bad model");
            }
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest(new { invalid = "Даний користувач не знайдений" });
            }
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Неправильні пошта і/або пароль" });
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(
                new
                {
                    token = _jwtToken.CreateToken(user)
                });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Bad model");
            }
            var user = new AppUser
            {
                UserName = model.Username,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Помилка створення користувача" });
            }
            result = await  _userManager.AddToRoleAsync(user, Roles.User);
            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Не вдалося надати роль" });
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(
                new
                {
                    token = _jwtToken.CreateToken(user)
                }) ;
        }
    }
}
