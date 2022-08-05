namespace Instagram.API.Domain.Models;

public class Comment : BaseAuditableEntity
{
    public Guid CommentId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string? CommentText { get; set; }
    public Post? Post { get; set; }
    public User? User { get; set; }
}
