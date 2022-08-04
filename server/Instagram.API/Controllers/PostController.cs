using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using AutoMapper;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services;
using Instagram.API.Resources;
using Instagram.API.Domain.Services.Communication;
namespace Instagram.API.Controllers;

public class PostController : BaseApiController
{
    private readonly IPostService? _postService;
    private readonly IMapper? _mapper;

    public PostController(IPostService postService, IMapper mapper)
    {
        _mapper = mapper;
        _postService = postService;
    }

    /// <summary>
    /// List all Post in database.
    /// </summary>
    /// <returns>Response for the request: getAllPost</returns>
    [HttpGet]
    public async Task<ActionResult<BaseResponse<PostResource>>> GetAllAsync()
    {
        var postList = await _postService.GetAllAsync();
        var resources = _mapper.Map<IEnumerable<Post>, IEnumerable<PostResource>>(postList);

        return new OkObjectResult(new BaseResponse<IEnumerable<PostResource>>(resources)); ;
    }

    /// <summary>
    /// Upload file from form-data.
    /// </summary>
    /// <returns>Response for the request: new Post.</returns>
    [HttpPost]
    public async Task<ActionResult<BaseResponse<PostResource>>> CreateAsync()
    {
        var formCollection = await Request.ReadFormAsync();
        var file = formCollection.Files.First();
        string Content = formCollection["Caption"];
        string UserId = formCollection["UserId"];

        try
        {
            if (file.Length > 0)
            {
                string fileName = Path.GetRandomFileName();

                Post newPost = await _postService.SaveAsync(file.OpenReadStream(), fileName, file.ContentType, Content, UserId);

                var resources = _mapper.Map<Post, PostResource>(newPost);

                return new OkObjectResult(new BaseResponse<PostResource>(resources));
            }
            else
            {
                return BadRequest(new BaseResponse<string>("you need to upload your photo"));
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new BaseResponse<string>($"Internal server error: {ex}"));
        }
    }
}