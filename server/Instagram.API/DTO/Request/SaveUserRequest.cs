using System.ComponentModel.DataAnnotations;

namespace Instagram.API.DTO.Request;

public class SaveUserRequest
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string PassWord { get; set; }

    public string Gender { get; set; }

    [Required]
    public string Username { get; set; }

    public string Bio { get; set; }

    public string PhoneNumber { get; set; }
}
