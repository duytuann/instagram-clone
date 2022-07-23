namespace Instagram.Domain.Entities;

public class Comment : BaseAuditableEntity
{
    public Guid CommentsId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string? CommentText { get; set; }
}
