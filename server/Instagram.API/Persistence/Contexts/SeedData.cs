using Instagram.API.Domain.Models;

namespace Instagram.API.Persistence.Contexts;

public static class SeedData
{
    public static async Task Seed(AppDbContext context)
    {
        // var users = new List<User>
        // {
        //     new User {
        //         Email= "admin01@gmail.com",
        //         PassWord = "admin01",
        //         Gender = "Male",
        //         Username = "duytuan",
        //         Name = "Tuan Do",
        //         Bio = "Hehe this is my Bio",
        //         PhoneNumber = "0977665661",
        //     }
        // };

        // context.Users.AddRange(users);

        await context.SaveChangesAsync();
    }
}