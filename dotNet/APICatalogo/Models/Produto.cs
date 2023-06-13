using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICatalogo.Models;

public class Produto
{
    public int Id { get; set; }
    [Required]
    [MaxLength(80)]
    public string? Nome { get; set; }
    [Required]
    [MaxLength(300)]
    public string? Descricao { get; set; }
    [Required]
    [Column(TypeName ="decimal(10,2)")]
    public decimal? Preco { get; set; }
    [Required]
    [MaxLength(300)]
    public string? ImagemUrl { get; set; }
    public float Estoque { get; set; }
    public DateTime Data { get; set; }
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }
}