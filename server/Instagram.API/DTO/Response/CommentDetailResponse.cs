using Instagram.API.Domain.Models;

namespace Instagram.API.DTO.Response;

public class CommentDetailResponse
{
    public Guid CommentId { get; set; }

    public Guid UserId { get; set; }

    public Guid PostId { get; set; }

    public String Username { get; set; }

    public String CommentText { get; set; }
}