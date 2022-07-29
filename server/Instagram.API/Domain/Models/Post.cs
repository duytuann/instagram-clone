namespace Instagram.API.Domain.Models;

public class Post
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string? Caption { get; set; }
    public string? MediaPath { get; set; }
    
    // public IList<Like> Likes { get; private set; } = new List<Like>();
    // public IList<Comment> Comments { get; private set; } = new List<Comment>();

    public User User { get; set; }
}
