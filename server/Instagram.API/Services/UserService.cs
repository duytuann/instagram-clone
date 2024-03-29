using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;
using Instagram.API.DTO.Response;

namespace Instagram.API.Services;

public class UserService : IUserService
{
    private readonly string _storageConnectionString;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IConfiguration configuration, IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _storageConnectionString = configuration.GetConnectionString("AzureStorage");
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }
    public async Task<IEnumerable<User>> ListAsync()
    {
        return await _userRepository.ListAsync();
    }

    public async Task<string> UpdateAvatarAsync(Stream fileStream, string fileName, string contentType, Guid UserId)
    {
        string avatarMediaPath = "";
        try
        {
            var container = new BlobContainerClient(_storageConnectionString, "instagram-clone");
            var createResponse = await container.CreateIfNotExistsAsync();

            if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                await container.SetAccessPolicyAsync(PublicAccessType.Blob);

            var blob = container.GetBlobClient(fileName);
            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
            await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

            _userRepository.UpdateAvatar(blob.Uri.ToString(), UserId);
            avatarMediaPath = blob.Uri.ToString();
            await _unitOfWork.CompleteAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return avatarMediaPath;
    }

    public async Task<ProfileResponse> GetProfileAsync(string UserName)
    {
        return await _userRepository.GetProfileAsync(UserName);
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
            Console.WriteLine(e);
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