namespace Instagram.API.DTO.Response;

public class Preview
{
    public Guid PostId { get; set; }
    public int LikeCount { get; set; }
    public int CommentCount { get; set; }
    public string MediaPath { get; set; }
}

public class ProfileResponse
{
    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string Gender { get; set; }
    public string Username { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string PhoneNumber { get; set; }
    public string Avatar { get; set; }

    public IList<Preview> Previews { get; set; }
}