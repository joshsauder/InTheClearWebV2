using System;
namespace InTheClearWebV2.Models
{
    public class UserResponse
    {
        public String Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool Paid {get; set;}
    }
}
