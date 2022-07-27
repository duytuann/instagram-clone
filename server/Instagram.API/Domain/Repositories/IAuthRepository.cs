using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IAuthRepository
{
    User AuthAsync(Login login);
}