using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Instagram.API.Domain.Models;

namespace Instagram.API.Persistence.Contexts.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.UserId);
        builder.HasIndex(u => u.Email).IsUnique(true);
        builder.HasIndex(u => u.Username).IsUnique(true);
        builder.Property(u => u.Created).HasDefaultValueSql("NOW()");
        builder.Property(u => u.LastModified).HasDefaultValueSql("NOW()");
        builder.Property(u => u.UserId).IsRequired().ValueGeneratedOnAdd();
        builder.Property(u => u.Email).IsRequired();
        builder.Property(u => u.PassWord).IsRequired();
        builder.Property(u => u.Username).IsRequired();
        builder.Property(u => u.Name).IsRequired();
        builder.Property(u => u.Bio).HasMaxLength(300);
        builder.Property(u => u.PhoneNumber).HasMaxLength(10);
        builder.HasMany(u => u.Posts).WithOne(p => p.User).HasForeignKey(u => u.UserId);
        builder.HasMany(u => u.Followers).WithOne(f => f.User).HasForeignKey(u => u.UserID);
        builder.HasMany(u => u.Followings).WithOne(f => f.User).HasForeignKey(u => u.UserID);
        builder.HasMany(u => u.Likes).WithOne(l => l.User).HasForeignKey(u => u.UserId);
        builder.HasMany(u => u.Comments).WithOne(c => c.User).HasForeignKey(u => u.UserId);
    }
}
