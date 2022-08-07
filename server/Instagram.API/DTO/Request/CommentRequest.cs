namespace Instagram.API.DTO.Request;

public class CommentRequest
{
    public string? CommentText { get; set; }
    public Guid PostId { get; set; }
}