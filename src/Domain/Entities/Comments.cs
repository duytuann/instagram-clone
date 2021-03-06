namespace Instagram.Domain.Entities;

public class Comments : BaseAuditableEntity
{
    //int or guid?
    public int CommentsId { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string? CommentText { get; set; }
}
