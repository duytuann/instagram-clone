namespace Instagram.API.DTO.Response;

public class UserResponse
{
    public Guid UserId { get; set; }
    public string email { get; set; }
    public string username { get; set; }
    public string name { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastModified { get; set; }
}