using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> ListAsync();
    Task<User> AddAsync(User user);
    Task<User> FindByIdAsync(Guid id);
    void Update(User user);
}