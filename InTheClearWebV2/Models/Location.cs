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
        public String Temperature { get; set; }
        public double Latitude {get; set;}
        public double Longitude {get; set;}
        public Guid TripId { get; set; }
        public virtual Trip Trip { get; set; }
    }
}
