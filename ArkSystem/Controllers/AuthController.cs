using ArkSystem.AuthServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Serilog.Core;
using Serilog.Events;
using System.Diagnostics;
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
        private readonly ILogger<AuthController> _logger;
        public AuthController(SessionService sessionService, ArkDbContext context, ILogger<AuthController> logger)
        {
            _sessionService = sessionService;
            _context = context;
            _logger = logger;

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
        public async Task<ActionResult<string>> LogOut()
        {
            Console.Clear();
            var refreshToken = Request.Cookies["refreshToken"];
            var userName = Request.Cookies["User"];

            if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(userName))
            {
                return BadRequest("Invalid request");
            }

            // Invalidate the refresh token
            var result = await _sessionService.InvalidateRefreshToken(refreshToken, userName);
            if (!result)
            {
                _logger.LogWarning("Error invalidating refresh token");
            }
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(-1),
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Secure = true,
                HttpOnly = true,
            };
            Response.Cookies.Delete("refreshToken",cookieOptions);
            Response.Cookies.Delete("User", cookieOptions);

            return Ok();

        }
            [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var UserName = Request.Cookies["User"];


            var ExpireCookieOptions = new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(-1),
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Secure = true,
                HttpOnly = true,
            };

            if (UserName == null)
            {

                Response.Cookies.Delete("refreshToken", ExpireCookieOptions);
                Response.Cookies.Delete("User", ExpireCookieOptions);
                return Unauthorized("Token expired.");
            }



            var User = await _sessionService.GetUser(UserName);
            if (User == null || User.RefreshToken == null)
            {
                Response.Cookies.Delete("refreshToken", ExpireCookieOptions);
                Response.Cookies.Delete("User", ExpireCookieOptions);
                return Unauthorized("Token expired.");
            }
            else if (!User.RefreshToken.Equals(refreshToken))
            {
                User.LastActivity = DateTime.Now;
                User.SessionTime = DateTime.Now - User.LastLogin;
                await _context.SaveChangesAsync();
                Response.Cookies.Delete("refreshToken", ExpireCookieOptions);
                Response.Cookies.Delete("User", ExpireCookieOptions);
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (User.TokenExpires < DateTime.Now)
            {
                User.LastActivity = DateTime.Now;
                User.SessionTime = DateTime.Now - User.LastLogin;
                await _context.SaveChangesAsync();
                Response.Cookies.Delete("refreshToken", ExpireCookieOptions);
                Response.Cookies.Delete("User", ExpireCookieOptions);
                return Unauthorized("RefreshToken expired.");
            }
            else if (User.IsLocked == true)
            {
                return Unauthorized("User is Locked ! Please contact Administrator");
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

            User.SessionTime = DateTime.Now-User.LastLogin;
            User.RefreshToken = newRefreshToken.Token;
            User.TokenCreated = newRefreshToken.Created;
            User.TokenExpires = newRefreshToken.Expires;
            User.LastActivity = DateTime.Now;
            await _context.SaveChangesAsync();


            return Ok(token);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            _logger.LogInformation("Login API Called. Time: {Time}", DateTime.Now);

            var User = await _sessionService.GetUser(request.Username);
            stopwatch.Stop();
            _logger.LogInformation("User Verified. Time: {Time}, Elapsed: {ElapsedMilliseconds} ms", DateTime.Now, stopwatch.ElapsedMilliseconds);

            if (User == null)
            {
                return BadRequest("User not found.");
            }
            else if (!_sessionService.VerifyPasswordHash(request.password, User.PasswordHash, User.PasswordSalt))
            {

                User.LoginAttempts = User.LoginAttempts == null? 1:User.LoginAttempts + 1;
                if (User.LoginAttempts > 2)
                {
                    User.IsLocked = true;
                    return Unauthorized("User is Locked ! Please contact Administrator");
                }
                await _context.SaveChangesAsync();
                return BadRequest("Wrong password.");
            }
            else if (User.IsLocked == true)
            {
                return Unauthorized("User is Locked ! Please contact Administrator");
            }
            stopwatch.Restart();
            _logger.LogInformation("Before Token generation. Time: {Time}", DateTime.Now);
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

            User.LoginAttempts = 0;
            User.IsLocked = false;
            User.IsLogged = true;
            User.RefreshToken = newRefreshToken.Token;
            User.TokenCreated = newRefreshToken.Created;
            User.TokenExpires = newRefreshToken.Expires;
            User.LastLogin = DateTime.Now;
            User.SessionTime = TimeSpan.Zero;
            await _context.SaveChangesAsync();
            stopwatch.Stop();
            _logger.LogInformation("After Token generation. Time: {Time}, Elapsed: {ElapsedMilliseconds} ms", DateTime.Now, stopwatch.ElapsedMilliseconds);

            return Ok(token);
        }


    }


}
