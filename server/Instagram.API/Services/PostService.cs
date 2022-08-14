using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;
using Instagram.API.DTO.Response;

namespace Instagram.API.Services;

public class PostService : IPostService
{
    private readonly string _storageConnectionString;
    private readonly IPostRepository _postRepository;
    private readonly IUnitOfWork _unitOfWork;

    public PostService(IConfiguration configuration, IPostRepository postRepository, IUnitOfWork unitOfWork)
    {
        _storageConnectionString = configuration.GetConnectionString("AzureStorage");
        _postRepository = postRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<PostDetailResponse>> GetAllAsync(Guid UserId)
    {
        return await _postRepository.GetAllAsync(UserId);
    }

    public async Task<IEnumerable<CommentResponse>> GetCommentOfPostAsync(Guid PostId, int PageNumber, int PageSize)
    {
        return await _postRepository.GetCommentOfPostAsync(PostId, PageNumber, PageSize);
    }

    public async Task<Post> SaveAsync(Stream fileStream, string fileName, string contentType, string Caption, Guid UserId)
    {
        var newPost = new Post();
        try
        {
            var container = new BlobContainerClient(_storageConnectionString, "instagram-clone");
            var createResponse = await container.CreateIfNotExistsAsync();

            if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                await container.SetAccessPolicyAsync(PublicAccessType.Blob);

            var blob = container.GetBlobClient(fileName);
            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
            await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

            newPost = await _postRepository.SaveAsync(blob.Uri.ToString(), Caption, UserId);

            await _unitOfWork.CompleteAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return newPost;
    }

    public async Task<bool> Like(Guid UserId, Guid PostId)
    {
        try
        {
            await _postRepository.Like(UserId, PostId);
            await _unitOfWork.CompleteAsync();

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> Unlike(Guid UserId, Guid PostId)
    {
        try
        {
            await _postRepository.Unlike(UserId, PostId);
            await _unitOfWork.CompleteAsync();

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> Comment(string Comment, Guid UserId, Guid PostId)
    {
        try
        {
            await _postRepository.Comment(Comment, UserId, PostId);
            await _unitOfWork.CompleteAsync();

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<PostDetailResponse> GetPostDetailAsync(Guid PostId, Guid UserId)
    {
        return await _postRepository.GetPostDetailByIdAsync(PostId, UserId);
    }
}