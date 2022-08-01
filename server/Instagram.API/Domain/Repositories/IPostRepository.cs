using Instagram.API.Domain.Models;

namespace Instagram.API.Domain.Repositories;

public interface IPostRepository
{
    Task<Post> SaveAsync(String MediaPath, string Caption, string UserId);
}