using System;
using InTheClearWebV2.Models;
using System.Collections.Generic;

namespace InTheClearWebV2.Services
{
    public interface ITripService
    {
        public void AddTrip(Trip trip);
        public List<Trip> GetTrips(Guid id);
    }
}
