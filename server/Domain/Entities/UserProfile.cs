namespace Instagram.Domain.Entities;

public class UserProfile : BaseAuditableEntity
{
    public Guid UserId { get; set; }
    public string? EmailAddress { get; set; }

    public string? PassWord { get; set; }
    public string? Gender { get; set; }
    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Bio { get; set; }
    public int PhoneNumber { get; set; }
    public IList<Follower> Followers { get; private set; } = new List<Follower>();
    public IList<Following> Followings { get; private set; } = new List<Following>();
    public IList<Post> Posts { get; private set; } = new List<Post>();
    public IList<Like> Likes { get; private set; } = new List<Like>();
    public IList<Comment> Comments { get; private set; } = new List<Comment>();
}
