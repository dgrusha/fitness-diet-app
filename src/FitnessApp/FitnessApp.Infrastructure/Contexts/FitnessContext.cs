﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp.Infrastructure.Contexts;
public class FitnessContext : DbContext
{

    public DbSet<User> Users { get; set; } = null!;

    public FitnessContext(DbContextOptions<FitnessContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new MainConfiguration());

    }

}