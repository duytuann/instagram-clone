using Instagram.API.Domain.Models;
using Instagram.API.DTO.Response;
using Instagram.API.Domain.Helper;

namespace Instagram.API.Domain.Repositories;

public interface IPostRepository
{
    Task<IEnumerable<PostDetailResponse>> GetAllAsync(Guid UserId);
    Task<PagedList<CommentResponse>> GetCommentOfPostAsync(Guid PostId, int PageNumber, int PageSize);
    Task<ProfileResponse> GetProfileAsync(string UserName);
    Task<Post> SaveAsync(String MediaPath, string Caption, Guid UserId);
    Task Like(Guid UserId, Guid PostId);
    Task Unlike(Guid UserId, Guid PostId);
    Task Comment(string Comment, Guid _userId, Guid PostId);
    Task<PostDetailResponse> GetPostDetailByIdAsync(Guid PostId, Guid UserId);
}