using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <sumary>
    /// Authentication user
    /// </sumary>
    /// <param name="resource">Username/Email and Password.</param>
    /// <returns> Response: Token and User data.</returns>
    [HttpPost]
    public ActionResult<BaseResponse<LoginResponse>> Login([FromBody] LoginRequest login)
    {
        var resource = _authService.AuthAsync(login);

        if (resource == null)
            return BadRequest(new BaseResponse<string>("Unauthorization"));

        return new OkObjectResult(new BaseResponse<LoginResponse>(resource));
    }

    /// <sumary>
    /// Logout: Remove access Token.
    /// </sumary>
    /// <param name="resource">Token.</param>
    /// <returns> Response: Remove token -> Logout success.</returns>
    [Authorize]
    [HttpPost]
    public ActionResult<BaseResponse<Response>> Logout([FromBody] string Token)
    {
        if (string.IsNullOrEmpty(Token))
            return BadRequest(new BaseResponse<string>("Failed to Logout"));

        return new OkObjectResult(new BaseResponse<Response>(new Response
        {
            message = "successful logout"
        }));
    }
}
