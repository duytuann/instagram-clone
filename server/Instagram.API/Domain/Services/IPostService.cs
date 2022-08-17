using Instagram.API.Domain.Models;
using Instagram.API.Domain.Helper;
using Instagram.API.DTO.Response;

namespace Instagram.API.Domain.Services;

public interface IPostService
{
    Task<IEnumerable<PostDetailResponse>> GetAllAsync(Guid UserId);

    Task<ProfileResponse> GetProfileAsync(string UserName);

    PagedList<CommentResponse> GetCommentOfPostAsync(Guid PostId, int PageNumber, int PageSize);

    Task<Post> SaveAsync(Stream fileStream, string fileName, string contentType, string Content, Guid UserId);

    Task<bool> Like(Guid UserId, Guid PostId);

    Task<bool> Unlike(Guid UserId, Guid PostId);

    Task<bool> Comment(String CommentText, Guid _userId, Guid PostId);

    Task<PostDetailResponse> GetPostDetailAsync(Guid PostId, Guid UserId);
}