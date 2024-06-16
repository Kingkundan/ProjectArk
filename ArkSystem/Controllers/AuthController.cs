using ArkSystem.AuthServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ArkSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SessionService _sessionService;
        private readonly ArkDbContext _context;
        public AuthController(SessionService sessionService, ArkDbContext context)
        {
            _sessionService = sessionService;
            _context = context;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(LoginModel request)
        {

            await _sessionService.RegisterUser(request);

            return Ok("User Registered Successfully");
        }
        [HttpGet]
        [Route("[action]")]
        public ActionResult ValidateUser()
        {
            
            return Ok("Valid");
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var UserName = Request.Cookies["User"];

            if (UserName == null)
            {
                return Unauthorized("Token expired.");
            }



            var User = await _sessionService.GetUser(UserName);
            if (User == null || User.RefreshToken == null)
            {
                return Unauthorized("Token expired.");
            }
            else if (!User.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (User.TokenExpires < DateTime.Now)
            {
                return Unauthorized("RefreshToken expired.");
            }

            string token = _sessionService.CreateToken(User);
            var newRefreshToken = _sessionService.GenerateRefreshToken();
            var cookieOptions = new CookieOptions
            {
                Expires = newRefreshToken.Expires,
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Secure = true,
                HttpOnly = true,
            };
            Response.Cookies.Append("User", User.Username, cookieOptions);
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);


            User.RefreshToken = newRefreshToken.Token;
            User.TokenCreated = newRefreshToken.Created;
            User.TokenExpires = newRefreshToken.Expires;
            await _context.SaveChangesAsync();


            return Ok(token);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            var User = await _sessionService.GetUser(request.Username);
            if (User == null) { 
            
                return BadRequest("User not found.");
            }
            else if (!_sessionService.VerifyPasswordHash(request.password, User.PasswordHash, User.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = _sessionService.CreateToken(User);
            var newRefreshToken = _sessionService.GenerateRefreshToken();
            var cookieOptions = new CookieOptions
            {
                Expires = newRefreshToken.Expires,
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Secure = true,
                HttpOnly = true,
            };

            Response.Cookies.Append("User", User.Username, cookieOptions);
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            
            User.RefreshToken = newRefreshToken.Token;
            User.TokenCreated = newRefreshToken.Created;
            User.TokenExpires = newRefreshToken.Expires;
            await _context.SaveChangesAsync();

            return Ok(token);


        }


    }


}
