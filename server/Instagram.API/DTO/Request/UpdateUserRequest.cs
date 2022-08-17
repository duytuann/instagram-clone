namespace Instagram.API.DTO.Request;

public class UpdateUserRequest
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Gender { get; set; }
    public string Bio { get; set; }
    public string PhoneNumber { get; set; }
}