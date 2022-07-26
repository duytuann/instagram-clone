using Instagram.API.Persistence.Contexts;

namespace Instagram.API;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await SeedData.Seed(context);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
}
