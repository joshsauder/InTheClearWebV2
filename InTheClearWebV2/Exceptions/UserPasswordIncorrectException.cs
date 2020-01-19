using System;
namespace InTheClearWebV2.Exceptions
{
    public class UserPasswordIncorrectException : Exception
    {

        public UserPasswordIncorrectException()
        { }

        public UserPasswordIncorrectException(string message) : base(message)
        {
        }

        public UserPasswordIncorrectException(string message, Exception inner)
            : base(message, inner)
        { }
    }
}
