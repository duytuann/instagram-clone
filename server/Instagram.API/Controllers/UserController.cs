using Microsoft.AspNetCore.Mvc;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Models;

namespace Instagram.API.Controllers;

[Route("/api/[controller]")]
public class UserController : Controller
{
    private readonly IUserService? _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var userList = await _userService.ListAsync();
        return userList;
    }
}