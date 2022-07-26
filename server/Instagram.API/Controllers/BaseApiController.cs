using Microsoft.AspNetCore.Mvc;

namespace Instagram.API.Controllers
{
    [Route("/api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {

    }
}