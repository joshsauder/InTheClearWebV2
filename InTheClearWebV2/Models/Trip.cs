using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InTheClearWebV2.Models
{
    public class Trip
    {
        [Key]
        public Guid TripId { get; set; }
        [Required]
        public int UserId { get; set; }
        public int Duration { get; set; }
        public int Distance { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<Location> Locations { get; set; }
    }
}
