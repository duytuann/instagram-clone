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

    public async Task<Post> SaveAsync(String _MediaPath, string _Caption, string _UserId)
    {
        Post post = new Post
        {
            UserId = Guid.Parse(_UserId),
            Caption = _Caption,
            MediaPath = _MediaPath
        };

        await _context.AddAsync(post);

        return post;
    }
}