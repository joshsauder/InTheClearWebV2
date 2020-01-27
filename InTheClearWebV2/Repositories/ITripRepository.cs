using System;
using System.Collections.Generic;
using InTheClearWebV2.Models;
namespace InTheClearWebV2.Repositories
{
    public interface ITripRepository
    {
        public void AddTrip(Trip trip);
        public Trip GetTrip(int UserId, Guid tripId);
        public List<Trip> GetUserTrips(int UserId);
        public void Save();

    }
}
