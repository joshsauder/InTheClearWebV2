using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InTheClearWebV2.Models
{
    [Table("Location")]
    public class Location
    {
        public long Id { get; set; }
        [Required]
        public Guid TripId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public String City { get; set; }
        public String Condition { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
