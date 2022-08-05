using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Instagram.API.Persistence.Contexts.Configurations;

public class LikeConfiguration : IEntityTypeConfiguration<Like>
{
    public void Configure(EntityTypeBuilder<Like> builder)
    {
        builder.ToTable("Likes");
        builder.HasKey(l => l.LikeId);
        builder.Property(l => l.LikeId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(l => l.Created).HasDefaultValueSql("NOW()");
    }
}