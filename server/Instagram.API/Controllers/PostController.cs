using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services;
using Instagram.API.Resources;
using Instagram.API.Domain.Services.Communication;
using System.Diagnostics;
namespace Instagram.API.Controllers;

public class PostController : BaseApiController
{
    private readonly IPostService? _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]

    /// <summary>
    /// Upload file from form-data.
    /// </summary>
    /// <returns>List of Users.</returns>
    [HttpPost]
    public async Task<ActionResult<BaseResponse<Post>>> SaveAsync()
    {
        // var formCollection = await Request.ReadFormAsync();
        // try
        // {
        //     formCollection["caption"]
        // }
        // catch (Exception e)
        // {
        //     Console.WriteLine(e);
        // }
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