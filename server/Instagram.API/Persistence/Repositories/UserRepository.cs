using Microsoft.EntityFrameworkCore;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    // * The repository inherits the BaseRepository and implements ICategoryRepository.
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<User>> ListAsync()
        => await _context.Users.AsNoTracking().ToListAsync();

    public async Task AddAsync(User user)
        => await _context.Users.AddAsync(user);
}