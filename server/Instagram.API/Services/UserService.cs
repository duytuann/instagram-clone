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

    public async Task<User> SaveAsync(User user)
    {
        var res = await _userRepository.AddAsync(user);
        await _unitOfWork.CompleteAsync();

        if (res == null)
            return null; // wrong logic, should be return success : false;
        return res;
    }

    public async Task<User> UpdateAsync(Guid id, User user)
    {
        var existingUser = await _userRepository.FindByIdAsync(id);

        if (existingUser == null)
            return null; // Don't have User in Db

        existingUser.Username = user.Username;
        existingUser.Bio = user.Bio;
        existingUser.PhoneNumber = user.PhoneNumber;
        existingUser.Gender = user.Gender;
        existingUser.LastModified = DateTime.Now;

        try
        {
            _userRepository.Update(existingUser);
            await _unitOfWork.CompleteAsync();

            return existingUser;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<bool> FollowAsync(Guid _userId1, Guid _userId2)
    {
        var isUpdateDbOk = await _userRepository.FollowAsync(_userId1, _userId2);
        await _unitOfWork.CompleteAsync();

        return isUpdateDbOk;
    }

    public async Task<bool> UnfollowAsync(Guid _userId1, Guid _userId2)
    {
        var isUpdateDbOk = await _userRepository.FollowAsync(_userId1, _userId2);
        await _unitOfWork.CompleteAsync();

        return isUpdateDbOk;
    }
}