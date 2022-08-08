using Newtonsoft.Json;

namespace Instagram.API.Domain.Models;

public class Like : BaseAuditableEntity
{
    public Guid LikeId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
    [JsonIgnore]
    public Post? Post { get; set; }
}
