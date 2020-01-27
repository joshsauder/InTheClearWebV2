using System;
using System.Collections.Generic;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Repositories
{
    public interface ILocationRepository
    {
        public void AddLocations(Location[] locations);
        public void Save();
        
    }
}
