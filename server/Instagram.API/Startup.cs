using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
//using Instagram.API.Controllers.Config;
using Instagram.API.Domain.Repositories;
using Instagram.API.Domain.Services;
//using Instagram.API.Extensions;
using Instagram.API.Persistence.Contexts;
using Instagram.API.Persistence.Repositories;
using Instagram.API.Services;

namespace Instagram.API;

public class Startup
{
    private readonly IConfiguration Configuration;

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();


        services.AddDbContext<AppDbContext>(options =>
        {
            // options.UseSqlServer(Configuration.GetConnectionString("InstagramDatabase"));
            options.UseNpgsql("Server=localhost;Database=instagram;Port=5432;User ID=postgres;Password=duytuan208");
        });

        // * dependency injection
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        // app.UseCustomSwagger();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}