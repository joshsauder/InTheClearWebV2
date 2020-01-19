using System;
namespace InTheClearWebV2.ViewModal
{
    public class UserResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Token { get; set; }
    }
}
