using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICatalogo.Models;

public class Categoria
{
    public Categoria()
    {
        Produtos = new Collection<Produto>();
    }

    public int Id { get; set; }
    [Required]
    [MaxLength(80)]
    public string? Nome { get; set; }
    [Required]
    [MaxLength(300)]
    public string? ImagenUrl { get; set; }
    public ICollection<Produto>? Produtos { get; set; }
}