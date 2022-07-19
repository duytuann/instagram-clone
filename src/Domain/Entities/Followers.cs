namespace Instagram.Domain.Entities;

public class Followers : BaseAuditableEntity
{
    public Guid UserId { get; set; }
}
