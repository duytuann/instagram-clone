namespace Instagram.Domain.Entities;

public class Follower : BaseAuditableEntity
{
    public Guid UserId { get; set; }
}
