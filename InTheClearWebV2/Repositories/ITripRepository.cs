using System;
using System.Collections.Generic;
using InTheClearWebV2.Models;
namespace InTheClearWebV2.Repositories
{
    public interface ITripRepository
    {
        public void AddTrip(Trip trip);
        public Trip GetTrip(String UserId, Guid tripId);
        public List<Trip> GetUserTrips(Guid UserId);

    }
}
