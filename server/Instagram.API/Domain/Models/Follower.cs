namespace Instagram.API.Domain.Models;

public class Follower
{
    public Guid UserID { get; set; }
    public DateTime DateFollowed { get; set; }
}