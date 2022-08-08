using Instagram.API.Domain.Models;

namespace Instagram.API.DTO.Response;

public class PostDetailResponse
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public String? Username { get; set; }
    public String? MediaPath { get; set; }
    public int Likes { get; set; }
    public String? Caption { get; set; }
    public bool IsLiked { get; set; }
    public IEnumerable<Comment>? Comments { get; set; }
}