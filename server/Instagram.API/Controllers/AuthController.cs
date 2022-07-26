using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Instagram.API.Domain.Models;
using Instagram.API.Resources;

namespace Instagram.API.Controllers;

public class AuthController : BaseApiController
{
    [HttpPost]
    [ProducesResponseType(typeof(AuthResource), 200)]
    [ProducesResponseType(typeof(ErrorResource), 400)]
    public IActionResult Login([FromBody] Login user)
    {
        if (user is null)
        {
            return BadRequest(new ErrorResource("Username và Password không được để trống"));
        }

        if (user.UserName == "johndoe" && user.Password == "def@123")
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@123"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new AuthResource { Token = tokenString });
        }

        return Unauthorized();
    }
}