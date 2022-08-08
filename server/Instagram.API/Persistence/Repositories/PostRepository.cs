using Microsoft.EntityFrameworkCore;

using Instagram.API.DTO.Response;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

public class PostRepository : BaseRepository, IPostRepository
{
    // The repository inherits the BaseRepository and implements ICategoryRepository.
    public PostRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Post>> GetAllAsync()
        => await _context.Posts.AsNoTracking().ToListAsync();

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
        Comment comment = new Comment
        {
            PostId = _postId,
            UserId = _userId,
            CommentText = _comment,
            Created = DateTime.Now
        };

        await _context.Comments.AddAsync(comment);
    }

    public async Task<PostDetailResponse> GetPostDetailByIdAsync(Guid PostId)
    {
        // var post = await _context.Posts.FirstOrDefaultAsync(p => p.PostId == PostId);

        // var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == post.UserId);

        // var comments = await _context.Comments.Where(c => c.PostId == PostId).ToListAsync();

        // var likes = await _context.Likes.Where(l => l.PostId == PostId).ToListAsync();

        // var data = await _context.Users
        //     .Include(user => user.Posts.Where(post => post.PostId == PostId))
        //         .ThenInclude(post => post.Comments)
        //     .Include(user => user.Posts)
        //         .ThenInclude(post => post.Likes)
        //     .FirstOrDefaultAsync();

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
            IsLiked = false,
            Comments = data.Comments,
        };

        return postDetailResponse;
    }
}