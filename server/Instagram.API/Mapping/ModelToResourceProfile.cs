using AutoMapper;
using Instagram.API.Domain.Models;
using Instagram.API.Resources;

namespace Instagram.API.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<User, UserResource>();
            CreateMap<Post, PostResource>();
        }
    }
}