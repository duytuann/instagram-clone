using AutoMapper;
using Instagram.API.Domain.Models;
// using Instagram.API.Domain.Models.Queries;
using Instagram.API.Resources;

namespace Instagram.API.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveUserResource, User>();
            CreateMap<UpdateUserResource, User>();
        }
    }
}