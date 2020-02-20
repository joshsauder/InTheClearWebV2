using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace InTheClearWebV2.Models
{
    [Table("User")]
    public class User
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public bool Paid { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.Date)]
        public DateTime UpdatedAt { get; set; }
        
    }
}
