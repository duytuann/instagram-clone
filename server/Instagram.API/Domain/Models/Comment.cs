using Newtonsoft.Json;

namespace Instagram.API.Domain.Models;

public class Comment : BaseAuditableEntity
{
    public Guid CommentId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string CommentText { get; set; }
    public string CommentBy { get; set; }
    [JsonIgnore]
    public Post Post { get; set; }
    [JsonIgnore]
    public User User { get; set; }
}
