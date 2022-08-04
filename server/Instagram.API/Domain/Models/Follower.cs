namespace Instagram.API.Domain.Models;

public class Follower : BaseAuditableEntity
{
    public Guid FollowerId { get; set; }
    public Guid UserID { get; set; }
    public DateTime DateFollowed { get; set; }
    public User? User { get; set; }
}