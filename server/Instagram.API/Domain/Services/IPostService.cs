using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Domain.Services;

public interface IPostService
{
    Task<string> SaveAsync(Stream fileStream, string fileName, string contentType);
}