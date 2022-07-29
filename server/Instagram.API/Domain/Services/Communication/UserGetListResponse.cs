using Instagram.API.Resources;

namespace Instagram.API.Domain.Services.Communication;

public class UserGetListResponse : BaseResponse<IEnumerable<UserResource>>
{
    /// <summary>
    /// Creates a success response.
    /// </summary>
    /// <param name="user">Saved category.</param>
    /// <returns>Response.</returns>
    public UserGetListResponse(IEnumerable<UserResource> user) : base(user)
    { }

    /// <summary>
    /// Creates am error response.
    /// </summary>
    /// <param name="message">Error message.</param>
    /// <returns>Response.</returns>
    public UserGetListResponse(string message) : base(message)
    { }
}