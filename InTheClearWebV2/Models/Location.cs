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
        public float Latitude {get; set;}
        public float Longitiude {get; set;}
        public Guid TripId { get; set; }

        [ForeignKey("TripId")]
        public Trip Trip { get; set; }
    }
}
