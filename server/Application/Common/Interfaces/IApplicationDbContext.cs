using Instagram.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Instagram.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<UserProfile> UserProfiles { get; }

    DbSet<Post> Posts { get; }

    DbSet<Comment> Comments { get; }

    DbSet<Like> Likes { get; }

    DbSet<Follower> Followers { get; }

    DbSet<Following> Followings { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
