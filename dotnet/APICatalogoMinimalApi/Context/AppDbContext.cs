using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APICatalogoMinimalApi.Models;
using Microsoft.EntityFrameworkCore;

namespace APICatalogoMinimalApi.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {}

    public DbSet<Produto>? Produtos { get; set; }
    public DbSet<Categoria>? Categorias { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        //Categoria
        builder.Entity<Categoria>().HasKey(c=>c.Id);
        builder.Entity<Categoria>().Property(c=>c.Nome).HasMaxLength(100).IsRequired();
        builder.Entity<Categoria>().Property(c => c.Descricao).HasMaxLength(150).IsRequired();

        //Produto
        builder.Entity<Produto>().HasKey(c => c.Id);
        builder.Entity<Produto>().Property(c => c.Nome).HasMaxLength(100).IsRequired();
        builder.Entity<Produto>().Property(c => c.Descricao).HasMaxLength(150).IsRequired();
        builder.Entity<Produto>().Property(c=>c.Imagem).HasMaxLength(100);
        builder.Entity<Produto>().Property(c=>c.Preco).HasPrecision(14, 2);

        //Relacionamento
        builder.Entity<Produto>().HasOne<Categoria>(c=>c.Categoria).WithMany(p=>p.Produtos).HasForeignKey(c=>c.Id);
    }
}