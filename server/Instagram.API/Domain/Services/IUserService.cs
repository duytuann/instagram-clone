using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Domain.Services;

public interface IUserService
{
    Task<IEnumerable<User>> ListAsync();
    Task<User> SaveAsync(User user);
    Task<User> UpdateAsync(Guid id, User user);
    Task<bool> FollowAsync(Guid _userId1, Guid _userId2);
    Task<bool> UnfollowAsync(Guid _userId1, Guid _userId2);
}