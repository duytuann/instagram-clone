using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Instagram.API.Domain.Services;

namespace Instagram.API.Controllers;

public class PostController : BaseApiController
{
    private readonly IPostService? _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    public async Task<IActionResult> SaveAsync()
    {
        try
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string fileURL = await _postService.SaveAsync(file.OpenReadStream(), fileName, file.ContentType);
                return Ok(new { fileURL });
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}