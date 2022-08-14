namespace Instagram.API.DTO.Response;

public class CommentResponse
{
    public Guid CommentId { get; set; }
    public Guid UserId { get; set; }
    public string? Avatar { get; set; }
    public string? CommentText { get; set; }
    public string? Username { get; set; }
    public DateTime Created { get; set; }
}