namespace Instagram.Domain.Entities;

public class Like : BaseAuditableEntity
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}
