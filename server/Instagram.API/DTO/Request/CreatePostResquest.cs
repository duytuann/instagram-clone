namespace Instagram.API.DTO.Response;

public class CreatePostResquest
{
    public IFormFile? formFile { get; set; }
    public string? Caption { get; set; }
}