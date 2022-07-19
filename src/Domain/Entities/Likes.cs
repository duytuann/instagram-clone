namespace Instagram.Domain.Entities;

public class Likes : BaseAuditableEntity
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
