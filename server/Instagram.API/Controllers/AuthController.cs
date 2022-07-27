using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Instagram.API.Domain.Models;
using Instagram.API.Resources;
using Instagram.API.Domain.Services;

namespace Instagram.API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService? _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(AuthResource), 200)]
    [ProducesResponseType(typeof(ErrorResource), 400)]
    public IActionResult Login([FromBody] Login login)
    {
        var result = _authService.AuthAsync(login);
        if (result == null)
            return Unauthorized();


        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@123"));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var tokeOptions = new JwtSecurityToken(
            issuer: "http://localhost:5000",
            audience: "http://localhost:5000",
            claims: new List<Claim>(),
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

        return Ok(new AuthResource
        {
            Token = tokenString,
            UserId = result.UserId,
            Username = result.Username,
            Email = result.Email,
            Gender = result.Gender,
            Name = result.Name,
            Bio = result.Bio,
            PhoneNumber = result.PhoneNumber
        });
    }
}
