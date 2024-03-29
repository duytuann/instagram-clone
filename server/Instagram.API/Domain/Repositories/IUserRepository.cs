using Instagram.API.Domain.Models;
using Instagram.API.DTO.Response;

namespace Instagram.API.Domain.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> ListAsync();
    void UpdateAvatar(string MediaPath, Guid UserId);
    Task<ProfileResponse> GetProfileAsync(string UserName);
    Task<User> AddAsync(User user);
    Task<User> FindByIdAsync(Guid id);
    void Update(User user);
    Task<bool> FollowAsync(Guid _userId1, Guid _userId2);
    Task<bool> UnfollowAsync(Guid _userId1, Guid _userId2);
}