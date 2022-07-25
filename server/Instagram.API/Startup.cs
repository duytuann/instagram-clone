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
            options.UseSqlServer(Configuration.GetConnectionString("InstagramDatabase"));
        });

        
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
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