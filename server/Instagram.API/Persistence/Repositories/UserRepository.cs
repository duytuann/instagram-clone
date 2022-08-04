using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    // The repository inherits the BaseRepository and implements ICategoryRepository.
    public UserRepository(AppDbContext context) : base(context) { }

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

    public async Task<User> FindByIdAsync(Guid id)
    {
        return await _context.Users
                            .FirstOrDefaultAsync(u => u.UserId == id);
    }

    public void Update(User user)
    {
        _context.Users.Update(user);
    }


    // Logic: If A follow B
    // Following(A) + B and Follower(B) + A
    public async Task<bool> FollowAsync(Guid _userId1, Guid _userId2)
    {
        try
        {
            User UserA = await _context.Users.FirstOrDefaultAsync(u => u.UserId == _userId1);
            User UserB = await _context.Users.FirstOrDefaultAsync(u => u.UserId == _userId2);

            Following B = new Following
            {
                UserID = UserB.UserId,
                DateFollowed = DateTime.Now,
                User = UserB,
            };

            Follower A = new Follower
            {
                UserID = UserA.UserId,
                DateFollowed = DateTime.Now,
                User = UserA,
            };

            UserA.Followings.Add(B);
            UserB.Followers.Add(A);

            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    // Logic: If A unfollow B
    // Following(A) - B and Follower(B) - A
    public async Task<bool> UnfollowAsync(Guid _userId1, Guid _userId2)
    {
        try
        {
            User UserA = await _context.Users.FirstOrDefaultAsync(u => u.UserId == _userId1);
            User UserB = await _context.Users.FirstOrDefaultAsync(u => u.UserId == _userId2);

            Following B = new Following
            {
                UserID = UserB.UserId,
                DateFollowed = DateTime.Now,
                User = UserB,
            };

            Follower A = new Follower
            {
                UserID = UserA.UserId,
                DateFollowed = DateTime.Now,
                User = UserA,
            };

            UserA.Followings.Remove(B);
            UserB.Followers.Remove(A);

            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}