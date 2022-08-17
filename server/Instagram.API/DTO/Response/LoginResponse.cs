namespace Instagram.API.DTO.Response;

public class LoginResponse
{
    public string Token { get; set; }
    public Guid UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Gender { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string PhoneNumber { get; set; }
}