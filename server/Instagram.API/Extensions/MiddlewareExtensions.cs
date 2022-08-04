using Microsoft.OpenApi.Models;

namespace Instagram.API.Extensions;

public static class MiddlewareExtensions
{
    public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Instagram API",
                Version = "v1",
                Description = "Instagram API with ASP.NET Core 6",
                Contact = new OpenApiContact
                {
                    Name = "Evandro Gayer Gomes",
                    Url = new Uri("https://www.facebook.com/deeteeseeting/")
                },
                License = new OpenApiLicense
                {
                    Name = "MIT",
                },
            });

            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });

            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });
        return services;
    }

    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger().UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Instagram API");
            options.DocumentTitle = "Instagram API";
        });
        return app;
    }
}
