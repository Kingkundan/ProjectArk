using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ArkSystem.AuthServices
{
    public class SessionService
    {
        public User _user;
        private readonly ArkDbContext _context;
        private readonly TimeSpan _idleTimeout = TimeSpan.FromMinutes(5); // Set your idle timeout here
        private readonly IConfiguration _configuration;
        public SessionService(ArkDbContext context, IConfiguration configuration, User user)
        {
            _context = context;
            _configuration = configuration;
            _user = user;
        }
        public async Task RegisterUser(LoginModel request)
        {
            CreatePasswordHash(request.password, out byte[] passwordHash, out byte[] passwordSalt);

            _user.Username = request.Username;
            _user.PasswordHash = passwordHash;
            _user.PasswordSalt = passwordSalt;

            var Data = await _context.Users.FirstOrDefaultAsync(s => s.Username == _user.Username);
            if (Data == null)
            {
                _context.Users.Add(_user);
                await _context.SaveChangesAsync();
            }
            else
            {

            }
        }

        public  async Task<User?> GetUser(string UserName)
        {
            var Data = await _context.Users.FirstOrDefaultAsync(u => u.Username == UserName);

            if(Data == null)
            {
                return null;
            }
            else
            {
                return Data;
            }

        }
        
        public async Task StoreSessionTokenAsync(User user)
        {
            var existingSession = await _context.Users.FirstOrDefaultAsync(s => s.Username == user.Username);
            if (existingSession != null)
            {
                existingSession.LastActivity = DateTime.Now;
                existingSession.IdleTimeout = DateTime.Now + _idleTimeout;
            }

            await _context.SaveChangesAsync();
        }


        public async Task<ExpiryDetails> IsSessionValidAsync(string Username,string RefreshToken)
        {
            var session = await _context.Users.FirstOrDefaultAsync(s => s.Username == Username && s.RefreshToken == RefreshToken);
            var expiryDetails = new ExpiryDetails();
            if (session == null)
                return expiryDetails;

            if (DateTime.Now - session.LastActivity > _idleTimeout)
            {
                session.RefreshToken = null; 
                await _context.SaveChangesAsync();
                expiryDetails.IsValid = false;
                expiryDetails.Expiry = DateTime.Now + _idleTimeout;
                return expiryDetails;
            }

            session.LastActivity = DateTime.Now;
            session.IdleTimeout = DateTime.Now + _idleTimeout;
            await _context.SaveChangesAsync();
            expiryDetails.IsValid = true;
            expiryDetails.Expiry = DateTime.Now + _idleTimeout;
            return expiryDetails;
        }

        public async Task InvalidateSessionAsync(string Username, string RefreshToken)
        {
            var session = await _context.Users.FirstOrDefaultAsync(s => s.Username == Username && s.RefreshToken == RefreshToken);
            if (session != null)
            {
                session.RefreshToken = null;
                await _context.SaveChangesAsync();
            }
        }


        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

      

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new (ClaimTypes.Name, user.Username),
                new (ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var TokenExpiry = Convert.ToInt16(_configuration.GetSection("AppSettings:TokenExpiryInMinutes").Value);

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(TokenExpiry),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
    public class ExpiryDetails
    {
        public DateTime Expiry { get; set; }
        public bool IsValid { get; set; } = false;
    }

}
