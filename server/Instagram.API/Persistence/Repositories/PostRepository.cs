using Microsoft.EntityFrameworkCore;

using Instagram.API.DTO.Response;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

public class PostRepository : BaseRepository, IPostRepository
{
    public PostRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<PostDetailResponse>> GetAllAsync(Guid UserId)
        => await _context.Posts
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
                                IsLiked = data.Likes.Contains(_context.Likes.FirstOrDefault(l => l.PostId == data.PostId && l.UserId == UserId)),
                                Comments = data.Comments,
                            }
                        ).ToListAsync();



    public async Task<Post> SaveAsync(String _MediaPath, string _Caption, Guid _UserId)
    {
        Post post = new Post
        {
            UserId = _UserId,
            Caption = _Caption,
            MediaPath = _MediaPath
        };

        await _context.AddAsync(post);

        return post;
    }

    public async Task Like(Guid UserId, Guid PostId)
    {
        Like like = new Like
        {
            UserId = UserId,
            PostId = PostId,
            LastModified = DateTime.Now,
        };

        await _context.Likes.AddAsync(like);
    }

    public async Task Unlike(Guid UserId, Guid PostId)
    {
        Like like = await _context.Likes.FirstOrDefaultAsync(l => l.PostId == PostId && l.UserId == UserId);

        _context.Likes.Remove(like);
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
            IsLiked = data.Likes.Contains(_context.Likes.FirstOrDefault(l => l.PostId == data.PostId && l.UserId == UserId)),
            Comments = data.Comments,
        };

        return postDetailResponse;
    }
}