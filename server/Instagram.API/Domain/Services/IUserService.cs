using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Domain.Services;

public interface IUserService
{
    Task<IEnumerable<User>> ListAsync();
    Task<UserResponse> SaveAsync(User user);
}