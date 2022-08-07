using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllAsync();
    Task<Post> SaveAsync(String MediaPath, string Caption, Guid UserId);
    Task Like(Guid UserId, Guid PostId);
    Task Unlike(Guid UserId, Guid PostId);
    Task Comment(string Comment, Guid _userId, Guid PostId);
}