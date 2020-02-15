using System;
using System.Collections.Generic;
using System.Linq;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Repositories
{
    public class TripRepository : ITripRepository
    {

        private readonly EntityContext context;

        public TripRepository(EntityContext _context)
        {
            context = _context;
        }

        public void AddTrip(Trip trip)
        {
            context.Trips.Add(trip);
            
        }

        public Trip GetTrip(String UserId, Guid tripId)
        {
            return context.Trips
                .Single(trip => trip.TripId == tripId && trip.UserId.Equals(UserId));
        }

        public List<Trip> GetUserTrips(String UserId)
        {
            return context.Trips
                .Where(trip => trip.UserId.Equals(UserId))
                .OrderBy(trip => trip.CreatedAt)
                .ToList();
            
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
