using Instagram.Domain.Entities;
using MediatR;

namespace Instagram.Application.Commands.CreateComment;

public record CreateCommentCommand : IRequest<string>
{
    public string? Comment { get; init; }
}