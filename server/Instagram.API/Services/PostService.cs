using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Instagram.API.Domain.Services;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Models;

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

    public async Task<Post> SaveAsync(Stream fileStream, string fileName, string contentType, string Caption, string UserId)
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
}