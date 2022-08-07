using AutoMapper;
using Instagram.API.Domain.Models;
using Instagram.API.DTO.Request;
using Instagram.API.DTO.Response;

namespace Instagram.API.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<User, UserResponse>();
            CreateMap<Post, PostResponse>();
        }
    }
}