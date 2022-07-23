using Instagram.Application.Common.Interfaces;

namespace Instagram.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
