using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllAsync();
    Task<Post> SaveAsync(String MediaPath, string Caption, Guid UserId);
}