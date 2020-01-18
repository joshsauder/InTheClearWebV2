using System;
using InTheClearWebV2.Models;

namespace InTheClearWebV2.Services
{
    public interface ILocationService
    {
        public void AddLocations(Location[] locations);
    }
}
