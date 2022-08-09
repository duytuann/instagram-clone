using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services;
using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;
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
    public async Task<ActionResult<BaseResponse<PostDetailResponse>>> GetAllAsync()
    {
        Guid UserId = this.GetUserId();
        var postList = await _postService.GetAllAsync(UserId);

        return new OkObjectResult(new BaseResponse<IEnumerable<PostDetailResponse>>(postList)); ;
    }

    /// <summary>
    /// Upload file from form-data.
    /// </summary>
    /// <param name="resource">FormData: File and Caption.</param>
    /// <returns>Response for the request: new Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<PostResponse>>> CreateAsync([FromForm] CreatePostRequest dto)
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

                var resource = _mapper.Map<Post, PostResponse>(newPost);

                return new OkObjectResult(new BaseResponse<PostResponse>(resource));
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
    public async Task<ActionResult<BaseResponse<Response>>> LikeAsync(string postId)
    {
        Guid UserId = this.GetUserId();
        Guid PostId = Guid.Parse(postId);
        bool isLikeOk = await _postService.Like(UserId, PostId);

        if (!isLikeOk)
            return BadRequest(new BaseResponse<string>("Failed to Like this Post"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "Like Success"
        }));
    }

    /// <summary>
    /// User unlike Post.
    /// </summary>
    /// <param name="resource">PostId want to unlike.</param>
    /// <returns>Response for the request: unlike Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<Response>>> UnlikeAsync(string postId)
    {
        Guid UserId = this.GetUserId();
        Guid PostId = Guid.Parse(postId);

        bool isUnlikeOk = await _postService.Unlike(UserId, PostId);

        if (!isUnlikeOk)
            return BadRequest(new BaseResponse<string>("Failed to Unlike this Post"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "Unlike success"
        }));
    }

    /// <summary>
    /// Comment on Post.
    /// </summary>
    /// <param name="resource">Comment and PostId.</param>
    /// <returns>Response for the request: Comment on Post.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<Response>>> CommentAsync([FromBody] CommentRequest request)
    {
        string? comment = request.CommentText;
        Guid postId = Guid.Parse(request.PostId);
        Guid userId = this.GetUserId();

        bool isCommentOk = await _postService.Comment(comment, userId, postId);

        if (!isCommentOk)
            return BadRequest(new BaseResponse<string>("Failed to Comment on this Post"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "Comment success"
        }));
    }

    /// <summary>
    /// Get Detail by PostId.
    /// </summary>
    /// <param name="resource">PostId want to get Detail.</param>
    /// <returns>Response for the request: get Detail by Postid.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PostDetailResponse>> GetDetailByPostIdAsync(string postId)
    {
        Guid PostId = Guid.Parse(postId);
        PostDetailResponse postDetailResponse = await _postService.GetPostDetailAsync(PostId);

        if (postDetailResponse == null)
            return BadRequest(new BaseResponse<string>("Bad Request"));

        return new OkObjectResult(new BaseResponse<PostDetailResponse>(postDetailResponse));
    }
}