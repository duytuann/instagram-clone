using Microsoft.AspNetCore.Mvc;

namespace Instagram.API.Controllers
{
    [Route("/api/[controller]/[action]")]
    [Produces("application/json")]
    [ApiController]
    public class BaseApiController : ControllerBase { }
}