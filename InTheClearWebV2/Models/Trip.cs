﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InTheClearWebV2.Models
{
    [Table("Trip")]
    public class Trip
    {
        [Key]
        public Guid TripId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        public int Duration { get; set; }
        public int Distance { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
    }
}
