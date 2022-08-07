using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
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
}