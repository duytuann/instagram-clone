namespace Instagram.API.Resources;

public class PostResource
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastModified { get; set; }
    public string? Caption { get; set; }
    public string? MediaPath { get; set; }
}