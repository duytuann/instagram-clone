using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Supermarket.API.Persistence.Contexts.Configurations;

public class FollowingConfiguration : IEntityTypeConfiguration<Following>
{
    public void Configure(EntityTypeBuilder<Following> builder)
    {
        builder.ToTable("Followings");
        builder.HasKey(f => f.FollowingId);
        builder.Property(f => f.FollowingId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(f => f.DateFollowed).HasDefaultValueSql("NOW()");
        builder.Property(f => f.Created).HasDefaultValueSql("NOW()");
    }
}
