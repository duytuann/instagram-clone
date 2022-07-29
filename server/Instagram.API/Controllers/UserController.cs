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

    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<UserResource>), 200)]
    public async Task<UserGetListResponse> GetAllAsync()
    {
        var userList = await _userService.ListAsync();
        var resources = _mapper.Map<IEnumerable<User>, IEnumerable<UserResource>>(userList);

        return new UserGetListResponse(resources);
    }

    /// <summary>
    /// Saves a new User/Account.
    /// </summary>
    /// <param name="resource">User data.</param>
    /// <returns>Response for the request.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(UserResource), 201)]
    [ProducesResponseType(typeof(ErrorResource), 400)]
    public async Task<UserResponse> signUpAsync([FromBody] SaveUserResource resource)
    {
        var user = _mapper.Map<SaveUserResource, User>(resource);
        // Hash Password
        user.PassWord = BCrypt.Net.BCrypt.HashPassword(user.PassWord);

        return await _userService.SaveAsync(user);
    }
}