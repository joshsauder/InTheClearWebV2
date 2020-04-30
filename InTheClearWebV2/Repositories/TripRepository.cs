using System;
using System.Collections.Generic;
using System.Linq;
using InTheClearWebV2.Models;
using Microsoft.EntityFrameworkCore;

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
            context.SaveChanges();
            
        }

        public Trip GetTrip(Guid UserId, Guid tripId)
        {
            return context.Trips
                .Single(trip => trip.TripId == tripId && trip.UserId.Equals(UserId));
        }

        public List<Trip> GetUserTrips(Guid UserId)
        {
            return context.Trips
                .Where(trip => trip.UserId.Equals(UserId))
                .Include(t => t.Locations)
                .OrderByDescending(trip => trip.CreatedAt)
                .ToList();   
        }
    }
}
