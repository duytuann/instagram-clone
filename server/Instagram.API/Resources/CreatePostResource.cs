using Microsoft.AspNetCore.Http;

namespace Instagram.API.Resources;

public class CreatePostResource
{
    public IFormFile? formFile { get; set; }
    public string? Caption { get; set; }
    public string? UserId { get; set; }
}