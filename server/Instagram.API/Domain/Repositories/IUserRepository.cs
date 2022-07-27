using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> ListAsync();
    Task<string> AddAsync(User user);
}