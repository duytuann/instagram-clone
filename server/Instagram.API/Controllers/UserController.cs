using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using Instagram.API.Domain.Services.Communication;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Models;
using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;

namespace Instagram.API.Controllers;

public class UserController : BaseApiController
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    /// <summary>
    /// Lists all existing User.
    /// </summary>
    /// <returns>List of Users.</returns>
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<BaseResponse<IEnumerable<UserResponse>>>> GetAllAsync()
    {
        var userList = await _userService.ListAsync();
        var resource = _mapper.Map<IEnumerable<User>, IEnumerable<UserResponse>>(userList);

        return new OkObjectResult(new BaseResponse<IEnumerable<UserResponse>>(resource));
    }

    /// <summary>
    /// Saves a new User/Account.
    /// </summary>
    /// <param name="resource">User data.</param>
    /// <returns>Response for the request.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(BaseResponse<User>), 201)]
    [ProducesResponseType(typeof(BaseResponse<string>), 400)]
    public async Task<ActionResult<BaseResponse<User>>> SignUpAsync([FromBody] SaveUserRequest resource)
    {
        var user = _mapper.Map<SaveUserRequest, User>(resource);
        // Hash Password
        user.PassWord = BCrypt.Net.BCrypt.HashPassword(user.PassWord);

        var newUser = await _userService.SaveAsync(user);

        if (newUser == null)
            return BadRequest(new BaseResponse<string>("Failed to create new user"));

        return new OkObjectResult(new BaseResponse<User>(newUser));
    }

    /// <sumary>
    /// Update a new User/Account
    /// </sumary>
    /// <param name="resource">User data.</param>
    /// <returns> Reponse for the request.</returns>
    [HttpPut]
    [Authorize]
    public async Task<ActionResult<BaseResponse<User>>> UpdateAsync([FromBody] UpdateUserRequest resource)
    {
        var user = _mapper.Map<UpdateUserRequest, User>(resource);
        var result = await _userService.UpdateAsync(Guid.Parse(resource.UserId), user);

        if (result == null)
            return BadRequest(new BaseResponse<string>("Failed to update User"));

        return new OkObjectResult(new BaseResponse<User>(result));
    }

    /// <sumary>
    /// User follow other User
    /// </sumary>
    /// <param name="resource">UserId that the user wants to follow.</param>
    /// <returns>Reponse for the request.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<Response>>> FollowAsync(string UserId)
    {
        Guid _userId1 = this.GetUserId();
        Guid _userId2 = Guid.Parse(UserId);
        bool isFollowOk = await _userService.FollowAsync(_userId1, _userId2);

        if (!isFollowOk)
            return BadRequest(new BaseResponse<string>("Failed to follow User"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "Follow Success"
        }));
    }

    /// <sumary>
    /// User unfollow other User
    /// </sumary>
    /// <param name="resource">UserId that the user wants to unfollow.</param>
    /// <returns>Reponse for the request.</returns>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponse<Response>>> UnfollowAsync(string UserId)
    {
        Guid _userId1 = this.GetUserId();
        Guid _userId2 = Guid.Parse(UserId);
        bool isUnfollowOk = await _userService.UnfollowAsync(_userId1, _userId2);

        if (!isUnfollowOk)
            return BadRequest(new BaseResponse<string>("Failed to unfollow User"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "Unfollow Success"
        }));
    }
}