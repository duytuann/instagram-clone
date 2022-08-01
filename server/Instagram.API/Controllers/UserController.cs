using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using Instagram.API.Domain.Services.Communication;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Models;
using Instagram.API.Resources;

namespace Instagram.API.Controllers;

public class UserController : BaseApiController
{
    private readonly IUserService? _userService;
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
    [ProducesResponseType(typeof(IEnumerable<UserResource>), 200)]
    public async Task<ActionResult<BaseResponse<IEnumerable<UserResource>>>> GetAllAsync()
    {
        var userList = await _userService.ListAsync();
        var resources = _mapper.Map<IEnumerable<User>, IEnumerable<UserResource>>(userList);

        return new OkObjectResult(new BaseResponse<IEnumerable<UserResource>>(resources));
    }

    /// <summary>
    /// Saves a new User/Account.
    /// </summary>
    /// <param name="resource">User data.</param>
    /// <returns>Response for the request.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(UserResource), 201)]
    [ProducesResponseType(typeof(ErrorResource), 400)]
    public async Task<ActionResult<BaseResponse<User>>> signUpAsync([FromBody] SaveUserResource resource)
    {
        var user = _mapper.Map<SaveUserResource, User>(resource);
        // Hash Password
        user.PassWord = BCrypt.Net.BCrypt.HashPassword(user.PassWord);

        var newUser = await _userService.SaveAsync(user);
        if (newUser == null)
            return BadRequest(new BaseResponse<string>("Failed to create new user"));

        return new OkObjectResult(new BaseResponse<User>(newUser));
    }
}