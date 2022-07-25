namespace Instagram.API.Domain.Models;

public class Like
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
