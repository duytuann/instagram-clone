namespace Instagram.API.Domain.Models;

public class Following : BaseAuditableEntity
{
    public Guid FollowingId { get; set; }
    public Guid UserID { get; set; }
    public DateTime DateFollowed { get; set; }
    public User? User { get; set; }
}