using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Services.Communication;

namespace Instagram.API.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<IEnumerable<User>> ListAsync()
    {
        return await _userRepository.ListAsync();
    }

    public async Task<UserResponse> SaveAsync(User user)
    {
        try
        {
            var res = await _userRepository.AddAsync(user);
            await _unitOfWork.CompleteAsync();

            if (res == "Done")
                return new UserResponse(user);
            return new UserResponse(res);
        }
        catch (Exception e)
        {
            // Do some logging stuff
            return new UserResponse($"An error occurred when saving User: {e.Message}");
        }
    }
}