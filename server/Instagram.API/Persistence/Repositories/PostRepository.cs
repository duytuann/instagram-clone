using Microsoft.EntityFrameworkCore;

using Instagram.API.DTO.Response;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;
using Instagram.API.Domain.Helper;
using static Instagram.API.DTO.Response.Preview;

namespace Instagram.API.Persistence.Repositories;

public class PostRepository : BaseRepository, IPostRepository
{
    public PostRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<PostDetailResponse>> GetAllAsync(Guid UserId)
        => await _context.Posts
                        .OrderByDescending(post => post.Created)
                        .Include(post => post.User)
                        .Include(post => post.Likes)
                        .Include(post => post.Comments)
                        .Select(
                            data => new PostDetailResponse
                            {
                                PostId = data.PostId,
                                UserId = data.UserId,
                                Username = data.User.Username,
                                MediaPath = data.MediaPath,
                                Likes = data.Likes.Count(),
                                Caption = data.Caption,
                                IsFollow = data.User.Followings.Contains(_context.Followings.FirstOrDefault(f => f.UserID == data.UserId)),
                                IsLiked = data.Likes.Contains(_context.Likes.FirstOrDefault(l => l.PostId == data.PostId && l.UserId == UserId)),
                                Comments = data.Comments,
                                Avatar = data.User.Avatar,
                            }
                        ).ToListAsync();

    public PagedList<CommentResponse> GetCommentOfPostAsync(Guid PostId, int PageNumber, int PageSize)
        => PagedList<CommentResponse>.ToPagedList(
            _context.Comments
                        .Include(comment => comment.User)
                        .Where(comment => comment.PostId == PostId)
                        .OrderBy(comment => comment.Created)
                        .Select(
                            data => new CommentResponse
                            {
                                CommentId = data.CommentId,
                                UserId = data.UserId,
                                Avatar = data.User.Avatar,
                                CommentText = data.CommentText,
                                Username = data.User.Username,
                                Created = data.Created
                            }
                        ),
            PageNumber,
            PageSize
        );

    public async Task<Post> SaveAsync(String _MediaPath, string _Caption, Guid _UserId)
    {
        Post post = new Post
        {
            UserId = _UserId,
            Caption = _Caption,
            MediaPath = _MediaPath,
            Likes = new List<Like>(),
            Comments = new List<Comment>(),
        };

        await _context.AddAsync(post);

        return post;
    }

    public async Task Like(Guid UserId, Guid PostId)
    {
        Like temp = await _context.Likes.FirstOrDefaultAsync(l => l.PostId == PostId && l.UserId == UserId);

        if (temp == null)
        {
            Like like = new Like
            {
                UserId = UserId,
                PostId = PostId,
                LastModified = DateTime.Now,
            };

            await _context.Likes.AddAsync(like);

        }
    }

    public async Task Unlike(Guid UserId, Guid PostId)
    {
        Like like = await _context.Likes.FirstOrDefaultAsync(l => l.PostId == PostId && l.UserId == UserId);

        if (like != null)
        {
            _context.Likes.Remove(like);
        }
    }

    public async Task Comment(string _comment, Guid _userId, Guid _postId)
    {
        User userComment = await _context.Users.FirstOrDefaultAsync(u => u.UserId == _userId);

        Comment comment = new Comment
        {
            PostId = _postId,
            UserId = _userId,
            CommentText = _comment,
            Created = DateTime.Now,
            CommentBy = userComment.Username
        };

        await _context.Comments.AddAsync(comment);
    }

    public async Task<PostDetailResponse> GetPostDetailByIdAsync(Guid PostId, Guid UserId)
    {
        var data = await _context.Posts
                .Where(post => post.PostId == PostId)
                .Include(post => post.User)
                .Include(post => post.Likes)
                .Include(post => post.Comments)
                .FirstOrDefaultAsync();

        if (data == null)
            return null;

        PostDetailResponse postDetailResponse = new PostDetailResponse
        {
            PostId = data.PostId,
            UserId = data.UserId,
            Username = data.User.Username,
            MediaPath = data.MediaPath,
            Likes = data.Likes.Count(),
            Caption = data.Caption,
            Avatar = data.User.Avatar,
            IsLiked = data.Likes.Contains(_context.Likes.FirstOrDefault(l => l.PostId == data.PostId && l.UserId == UserId)),
            Comments = data.Comments,
        };

        return postDetailResponse;
    }
}