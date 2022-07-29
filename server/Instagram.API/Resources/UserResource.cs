namespace Instagram.API.Resources;

public class UserResource
{
    public Guid UserId { get; set; }
    public string? email { get; set; }
    public string? username { get; set; }
    public string? name { get; set; }
}