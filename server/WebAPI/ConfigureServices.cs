using Instagram.Application;
//using Instagram.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Instagram.WebAPI;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
}
