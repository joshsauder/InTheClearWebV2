using System;
using Newtonsoft.Json;

namespace InTheClearWebV2.Models
{
    public class Route
    {
        [JsonProperty(PropertyName = "lat")]
        public double Lat { get; set; }
        [JsonProperty(PropertyName = "lng")]
        public double Long {get; set; }
        [JsonProperty(PropertyName = "time")]
        public int Time { get; set; }
    }
}
