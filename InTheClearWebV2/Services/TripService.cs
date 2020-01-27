using System;
using System.Collections.Generic;
using InTheClearWebV2.Repositories;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public class LocationService : ITripService 
    {
        private readonly ITripRepository repository;

        public LocationService(ITripRepository _repository)
        {
            repository = _repository;
        }

        public void AddTrip(Trip trip)
        {
            var guid = Guid.NewGuid();
            trip.TripId = guid;

            repository.AddTrip(trip);
            repository.Save();
            
        } 
    }
}
