using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    // The repository inherits the BaseRepository and implements ICategoryRepository.
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<User>> ListAsync()
        => await _context.Users.AsNoTracking().ToListAsync();

    public async Task<User> AddAsync(User user)
    {
        // Create a pattern for a word that: 
        // Usernames can only use letters, numbers, underscores and periods
        string strRegexUsername = "^[A-Za-z0-9_.]+$";
        Regex validUsername = new Regex(strRegexUsername);
        if (!Regex.IsMatch(user.Username, strRegexUsername))
        {
            return null;
        }
        var isValid = _context.Users.FirstOrDefault(u => u.Email == user.Email || u.Username == user.Username);
        if (isValid != null)
        {
            return null;
        }

        await _context.Users.AddAsync(user);
        return user;
    }
}