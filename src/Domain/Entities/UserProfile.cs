namespace Instagram.Domain.Entities;

public class UserProfile : BaseAuditableEntity
{
    // GUID
    public Guid UserId { get; set; }
    public string? EmailAddress { get; set; }

    public string? PassWord { get; set; }
    public string? Gender { get; set; }
    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Bio { get; set; }
    public int PhoneNumber { get; set; }
}
