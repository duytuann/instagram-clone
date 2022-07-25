using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;

namespace Instagram.API.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        this._userRepository = userRepository;
    }
    public async Task<IEnumerable<User>> ListAsync()
    {
        return await _userRepository.ListAsync();
    }
}