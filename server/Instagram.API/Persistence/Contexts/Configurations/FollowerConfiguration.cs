using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Supermarket.API.Persistence.Contexts.Configurations;

public class FollowerConfiguration : IEntityTypeConfiguration<Follower>
{
    public void Configure(EntityTypeBuilder<Follower> builder)
    {
        builder.ToTable("Followers");
        builder.HasKey(f => f.FollowerId);
        builder.Property(f => f.FollowerId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(f => f.DateFollowed).HasDefaultValueSql("NOW()");
        builder.Property(f => f.Created).HasDefaultValueSql("NOW()");
    }
}
