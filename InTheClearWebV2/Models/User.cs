using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InTheClearWebV2.Models
{
    [Table("User")]
    public class User
    {
        public long Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        [Required]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.Date)]
        public DateTime UpdatedAt { get; set; }
    }
}
