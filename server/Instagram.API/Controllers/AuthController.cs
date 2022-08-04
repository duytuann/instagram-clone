using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

using Instagram.API.Domain.Models;
using Instagram.API.Resources;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService? _authService;

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
    [ProducesResponseType(typeof(AuthResource), 200)]
    [ProducesResponseType(typeof(ErrorResource), 400)]
    public ActionResult<BaseResponse<AuthResource>> Login([FromBody] Login login)
    {
        var result = _authService.AuthAsync(login);

        if (result == null)
            return BadRequest(new BaseResponse<string>("Unauthorization"));

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@123"));

        // Choose Algorithm
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        // Set UserId to Claim
        var claims = new[] {
            new Claim("UserId", result.UserId.ToString())
        };

        var tokenOptions = new JwtSecurityToken(
            issuer: "http://localhost:5000",
            audience: "http://localhost:5000",
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        var resource = new AuthResource
        {
            Token = tokenString,
            UserId = result.UserId,
            Username = result.Username,
            Email = result.Email,
            Gender = result.Gender,
            Name = result.Name,
            Bio = result.Bio,
            PhoneNumber = result.PhoneNumber
        };

        return new OkObjectResult(new BaseResponse<AuthResource>(resource));
    }

    /// <sumary>
    /// Logout: Remove access Token.
    /// </sumary>
    /// <param name="resource">Token.</param>
    /// <returns> Response: Remove token -> Logout success.</returns>
    [Authorize]
    [HttpPost]
    public ActionResult<BaseResponse<AuthResource>> Logout([FromBody] string Token)
    {
        if (string.IsNullOrEmpty(Token))
            return BadRequest(new BaseResponse<string>("Failed to Logout"));

        return new OkObjectResult(new BaseResponse<AuthResource>(new AuthResource()));
    }
}
