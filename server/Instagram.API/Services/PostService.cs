using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Instagram.API.Domain.Services;

namespace Instagram.API.Services;

public class PostService : IPostService
{
    private readonly string _storageConnectionString;
    public PostService(IConfiguration configuration)
    {
        _storageConnectionString = configuration.GetConnectionString("AzureStorage");
    }

    public async Task<string> SaveAsync(Stream fileStream, string fileName, string contentType)
    {
        var container = new BlobContainerClient(_storageConnectionString, "instagram-clone");
        var createResponse = await container.CreateIfNotExistsAsync();

        if (createResponse != null && createResponse.GetRawResponse().Status == 201)
            await container.SetAccessPolicyAsync(PublicAccessType.Blob);

        var blob = container.GetBlobClient(fileName);
        await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
        await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

        return blob.Uri.ToString();
    }
}