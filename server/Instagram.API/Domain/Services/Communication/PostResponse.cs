using Instagram.API.Resources;

namespace Instagram.API.Domain.Services.Communication;

public class PostResponse : BaseResponse<PostResource>
{
    /// <summary>
    /// Creates am success response.
    /// </summary>
    /// <param name="postResource">Post information.</param>
    /// <returns>Response.</returns>
    public PostResponse(PostResource postResource) : base(postResource)
    { }

    /// <summary>
    /// Creates am error response.
    /// </summary>
    /// <param name="message">Error message.</param>
    /// <returns>Response.</returns>
    public PostResponse(string message) : base(message)
    { }
}