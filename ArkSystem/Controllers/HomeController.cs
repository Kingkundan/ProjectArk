using ArkSystem.AuthServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArkSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        readonly ArkDbContext _context;
        public HomeController(ArkDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var Data = _context.Users.ToList();
            return Ok(Data);
        }

        // GET api/<HomeController>/5
        [HttpGet("{Username}")]
        public async Task<ActionResult> Get(string Username)
        {

            var IsUser = await _context.Users.SingleOrDefaultAsync(x => x.Username == Username);

            if (IsUser == null)
            {
                return NotFound();
            }

            return Ok(IsUser);
        }

        // POST api/<HomeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] User value)
        {

            await _context.Users.AddAsync(value);

            await _context.SaveChangesAsync();

            var Data = await _context.Users.ToListAsync();
            return Ok(Data);
        }

        // PUT api/<HomeController>/5
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] User value)
        {
            var IsUser = await _context.Users.SingleOrDefaultAsync(x => x.Username == value.Username);

            if (IsUser == null)
            {
                return NotFound();
            }
            IsUser.Password = value.Password;

            await _context.SaveChangesAsync();

            var Data = await _context.Users.ToListAsync();
            return Ok(Data);
        }

        // DELETE api/<HomeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
