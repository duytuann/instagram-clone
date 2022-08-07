using Instagram.API.Domain.Models;
using Instagram.API.DTO.Request;

namespace Instagram.API.Domain.Repositories;

public interface IAuthRepository
{
    User AuthAsync(LoginRequest login);
}