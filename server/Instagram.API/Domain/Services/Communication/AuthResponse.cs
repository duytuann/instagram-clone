using Instagram.API.Resources;

namespace Instagram.API.Domain.Services.Communication;

public class AuthResponse : BaseResponse<AuthResource>
{
    /// <summary>
    /// Creates a success response.
    /// </summary>
    /// <param name="AuthResource">Authentication.</param>
    /// <returns>Response.</returns>
    public AuthResponse(AuthResource authResource) : base(authResource)
    { }

    /// <summary>
    /// Creates am error response.
    /// </summary>
    /// <param name="message">Error message.</param>
    /// <returns>Response.</returns>
    public AuthResponse(string message) : base(message)
    { }
}