using System;
using System.Collections.Generic;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public class TripService : ITripService 
    {
        private readonly ITripRepository repository;

        public TripService(ITripRepository _repository)
        {
            repository = _repository;
        }

        public void AddTrip(Trip trip)
        {
            var guid = Guid.NewGuid();
            trip.TripId = guid;
            trip.CreatedAt = DateTime.Now;

            repository.AddTrip(trip);
            
        }

        public List<Trip> GetTrips(Guid id)
        {
            return repository.GetUserTrips(id);
        } 
    }
}
