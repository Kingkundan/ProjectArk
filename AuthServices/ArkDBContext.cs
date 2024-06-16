using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using ArkSystem.Models;
using Microsoft.Extensions.Configuration;


namespace ArkSystem.AuthServices
{

    public class ArkDbContext : DbContext
    {
        public ArkDbContext(DbContextOptions<ArkDbContext> options) : base(options)
        {
        }

        // Define DbSet properties for your entities
        public DbSet<User> Users { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }

        // Override OnModelCreating method if you need to configure entity mappings
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entity mappings here
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            // Add configurations for other entities as needed
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));

        }

    }

}
