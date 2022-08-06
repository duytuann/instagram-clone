using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [ProducesResponseType(typeof(BaseResponse<PostResource>), 201)]
    [ProducesResponseType(typeof(BaseResponse<string>), 400)]
    public async Task<ActionResult<BaseResponse<PostResource>>> GetAllAsync()
    {
        var postList = await _postService.GetAllAsync();
        var resources = _mapper.Map<IEnumerable<Post>, IEnumerable<PostResource>>(postList);

        return new OkObjectResult(new BaseResponse<IEnumerable<PostResource>>(resources)); ;
    }

    /// <summary>
    /// Upload file from form-data.
    /// </summary>
    /// <param name="resource">FormData: File and Caption.</param>
    /// <returns>Response for the request: new Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<PostResource>>> CreateAsync([FromForm] CreatePostResource dto)
    {
        var formCollection = await Request.ReadFormAsync();
        var file = formCollection.Files.First();
        string Content = formCollection["Caption"];
        Guid UserId = this.GetUserId();

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
                return BadRequest(new BaseResponse<string>("You need to upload your photo"));
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new BaseResponse<string>($"Internal server error: {ex}"));
        }
    }

    /// <summary>
    /// User like Post.
    /// </summary>
    /// <param name="resource">PostId want to like.</param>
    /// <returns>Response for the request: like Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<String>>> LikeAsync(string postId)
    {
        Guid UserId = this.GetUserId();
        Guid PostId = Guid.Parse(postId);
        bool isLikeOk = await _postService.Like(UserId, PostId);

        if (isLikeOk == false)
            return BadRequest(new BaseResponse<string>("Failed to Like this Post"));

        return new OkObjectResult(new BaseResponse<String>(new String("Liked Successfully")));
    }

    /// <summary>
    /// User unlike Post.
    /// </summary>
    /// <param name="resource">PostId want to unlike.</param>
    /// <returns>Response for the request: unlike Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<String>>> UnlikeAsync(string postId)
    {
        Guid UserId = this.GetUserId();
        Guid PostId = Guid.Parse(postId);
        
        bool isUnlikeOk = await _postService.Unlike(UserId, PostId);

        if (isUnlikeOk == false)
            return BadRequest(new BaseResponse<string>("Filed to Unlike this Post"));

        return new OkObjectResult(new BaseResponse<String>(new String("Unliked Successfully")));
    }

    /// <summary>
    /// Get Detail by PostId.
    /// </summary>
    /// <param name="resource">PostId want to get Detail.</param>
    /// <returns>Response for the request: get Detail by Postid.</returns>
    // [HttpPost]
    // [Authorize]
    // public async Task<ActionResult<String>> GetDetailByPostIdAsync(string postId)
    // {
    //     Guid PostId = Guid.Parse(postId);
        
    // }
}