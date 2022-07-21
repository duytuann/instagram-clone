namespace Instagram.Domain.Entities;

public class Following : BaseAuditableEntity
{
    public Guid UserId { get; set; }
}
