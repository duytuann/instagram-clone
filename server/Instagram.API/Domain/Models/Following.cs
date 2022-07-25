namespace Instagram.API.Domain.Models;

public class Following
{
    public Guid UserID { get; set; }
    public DateTime DateFollowed { get; set; }
}