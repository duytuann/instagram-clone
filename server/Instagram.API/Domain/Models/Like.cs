namespace Instagram.API.Domain.Models;

public class Like : BaseAuditableEntity
{
    public Guid LikeId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public Post? Post { get; set; }
}
