namespace Instaram.Domain.Exceptions;

public class UnFindUser : Exception
{
    public UnFindUser(string user)
        : base($"User \"{user}\" is unfind.")
    {
    }
}
