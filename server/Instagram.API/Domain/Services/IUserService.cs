using Instagram.API.Domain.Models;
using Instagram.API.DTO.Response;

namespace Instagram.API.Domain.Services;

public interface IUserService
{
    Task<IEnumerable<User>> ListAsync();
    Task<ProfileResponse> GetProfileAsync(string UserName);
    Task<string> UpdateAvatarAsync(Stream fileStream, string fileName, string contentType, Guid UserId);
    Task<User> SaveAsync(User user);
    Task<User> UpdateAsync(Guid id, User user);
    Task<bool> FollowAsync(Guid _userId1, Guid _userId2);
    Task<bool> UnfollowAsync(Guid _userId1, Guid _userId2);
}