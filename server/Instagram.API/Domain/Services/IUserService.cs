using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Services;

public interface IUserService
{
    Task<IEnumerable<User>> ListAsync();
}