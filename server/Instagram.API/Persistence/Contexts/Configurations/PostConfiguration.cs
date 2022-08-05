using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Instagram.API.Persistence.Contexts.Configurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.ToTable("Posts");
        builder.HasKey(p => p.PostId);
        builder.Property(p => p.PostId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(p => p.Created).HasDefaultValueSql("NOW()");
        builder.Property(p => p.LastModified).HasDefaultValueSql("NOW()");
        builder.Property(p => p.MediaPath).IsRequired();
        builder.Property(p => p.Caption).HasMaxLength(2200);
        builder.HasMany(p => p.Likes).WithOne(l => l.Post).HasForeignKey(p => p.PostId);
        builder.HasMany(p => p.Comments).WithOne(c => c.Post).HasForeignKey(p => p.PostId);
    }
}
