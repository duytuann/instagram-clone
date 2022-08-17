using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Instagram.API.Domain.Models;
using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;
using Instagram.API.DTO.Response;

namespace Instagram.API.Persistence.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    // The repository inherits the BaseRepository and implements ICategoryRepository.
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<User>> ListAsync()
        => await _context.Users.AsNoTracking().ToListAsync();

    public async Task<ProfileResponse> GetProfileAsync(string UserName)
    {
        List<Preview> posts = await _context.Posts
        .Where(post => post.User.Username == UserName)
        .Include(post => post.User)
        .Include(post => post.Likes)
        .Include(post => post.Comments)
        .Select(
            data => new Preview
            {
                PostId = data.PostId,
                LikeCount = data.Likes.Count(),
                CommentCount = data.Comments.Count(),
                MediaPath = data.MediaPath,
            }
        )
        .ToListAsync();

        return await _context.Users.Where(user => user.Username == UserName)
                                .Include(user => user.Posts)
                                .Include(user => user.Followers)
                                .Include(user => user.Followings)
                                .Select(
                                    data => new ProfileResponse
                                    {
                                        UserId = data.UserId,
                                        Email = data.Email,
                                        Gender = data.Gender,
                                        Username = data.Username,
                                        Name = data.Name,
                                        Bio = data.Bio,
                                        PhoneNumber = data.PhoneNumber,
                                        Avatar = data.Avatar,
                                        Follower = data.Followers.Count(),
                                        Following = data.Followings.Count(),
                                        Previews = posts
                                    }
                                ).FirstAsync();
    }

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

    public void UpdateAvatar(string MediaPath, Guid UserId)
    {
        User User = _context.Users.FirstOrDefault(u => u.UserId == UserId);
        User.Avatar = MediaPath;
        _context.Users.Update(User);
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
            Console.WriteLine(e);
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

            Following B = UserA.Followings.FirstOrDefault(f => f.UserID == UserB.UserId);
            Follower A = UserB.Followers.FirstOrDefault(f => f.UserID == UserA.UserId);

            UserA.Followings.Remove(B);
            UserB.Followers.Remove(A);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
}