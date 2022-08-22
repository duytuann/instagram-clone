using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;
using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;

namespace Instagram.API.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;

    public AuthService(IAuthRepository authRepository)
    {
        _authRepository = authRepository;
    }
    public LoginResponse AuthAsync(LoginRequest login)
    {
        User user = _authRepository.AuthAsync(login);

        if (user == null)
            return null;

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@123"));

        // Choose Algorithm
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        // Set UserId to Claim
        var claims = new[] {
            new Claim("UserId", user.UserId.ToString())
        };

        var tokenOptions = new JwtSecurityToken(
            issuer: "http://localhost:5000",
            audience: "http://localhost:5000",
            claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        var res = new LoginResponse
        {
            Token = tokenString,
            UserId = user.UserId,
            Username = user.Username,
            Email = user.Email,
            Gender = user.Gender,
            Name = user.Name,
            Bio = user.Bio,
            PhoneNumber = user.PhoneNumber,
            Avatar = user.Avatar
        };

        return res;
    }
}