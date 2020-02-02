using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace InTheClearWebV2.Models
{
    [Table("User")]
    public class User
    {
        public long Id { get; set; }
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        public bool Paid { get; set; }
        public byte[] Salt { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.Date)]
        public DateTime UpdatedAt { get; set; }
        
    }
}
