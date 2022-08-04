using Microsoft.AspNetCore.Mvc;

namespace Instagram.API.Controllers
{
    [Route("/api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected Guid GetUserId()
        {
            return Guid.Parse(this.User.Claims.First(i => i.Type == "UserId").Value);
        }
    }
}