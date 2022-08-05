using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Instagram.API.Persistence.Contexts.Configurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.ToTable("Comments");
        builder.HasKey(c => c.CommentId);
        builder.Property(c => c.CommentId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(c => c.CommentText).IsRequired().HasMaxLength(2200);
        builder.Property(c => c.Created).HasDefaultValueSql("NOW()");
    }
}