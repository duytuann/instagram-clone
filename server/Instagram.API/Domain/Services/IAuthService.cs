using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Services;

public interface IAuthService
{
    User AuthAsync(Login login);
}