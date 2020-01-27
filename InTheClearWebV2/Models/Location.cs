using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InTheClearWebV2.Models
{
    [Table("Location")]
    public class Location
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public String City { get; set; }
        public String Condition { get; set; }
        public int Temperature { get; set; }

        public Trip Trip { get; set; }
    }
}
