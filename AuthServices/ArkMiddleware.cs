using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace ArkSystem.AuthServices
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, SessionService sessionService)
        {
            var refreshToken = context.Request.Cookies["refreshToken"];
            var UserName = context.Request.Cookies["User"];
            if (refreshToken != null && UserName != null)
            {
                var Expiry = await sessionService.IsSessionValidAsync(UserName,refreshToken);
                if (!Expiry.IsValid)
                {
                    
                    context.Response.StatusCode = 401; // Unauthorized
                    context.Response.Cookies.Delete("refreshToken");
                    await context.Response.WriteAsync("Session has expired or is invalid.");
                    return;
                }
                else
                {
                    //context.Response.Cookies.Append("Expiry-DateTime", Expiry.Expiry.ToString(), new CookieOptions
                    //{
                    //    HttpOnly = true,
                    //    Secure = false,      
                    //    Expires = Expiry.Expiry,
                    //    SameSite = SameSiteMode.None // Important for cross-site cookie
                    //});
                }
            }

            await _next(context);
            return;
        }
    }


}
