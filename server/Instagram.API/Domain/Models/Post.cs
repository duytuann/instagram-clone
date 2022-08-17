using Newtonsoft.Json;

namespace Instagram.API.Domain.Models;

public class Post : BaseAuditableEntity
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string Caption { get; set; }
    public string MediaPath { get; set; }
    public IList<Like> Likes { get; private set; } = new List<Like>();
    public IList<Comment> Comments { get; private set; } = new List<Comment>();
    [JsonIgnore]
    public User User { get; set; }
}
