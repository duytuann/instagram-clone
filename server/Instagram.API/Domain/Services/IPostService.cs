using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Domain.Services;

public interface IPostService
{
    Task<IEnumerable<Post>> GetAllAsync();

    Task<Post> SaveAsync(Stream fileStream, string fileName, string contentType, string Content, Guid UserId);

    Task<bool> Like(Guid UserId, Guid PostId);

    Task<bool> Unlike(Guid UserId, Guid PostId);

    // Task<Object> Comment(Guid PostId, String CommentText);
}