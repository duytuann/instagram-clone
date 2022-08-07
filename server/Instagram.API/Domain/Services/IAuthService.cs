using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;

namespace Instagram.API.Domain.Services;

public interface IAuthService
{
    LoginResponse AuthAsync(LoginRequest login);
}