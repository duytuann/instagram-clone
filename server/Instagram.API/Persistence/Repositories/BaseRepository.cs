using Instagram.API.Persistence.Contexts;

namespace Instagram.API.Persistence.Repositories;

// * Là một Abstract class mà tất cả các repositories sẽ kế thừa
// * An abstract class is a class that don’t have direct instances. 
// * You have to create direct classes to create the instances.
public abstract class BaseRepository
{
    // protected : chỉ truy cập được các class con : _context
    protected readonly AppDbContext _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
    }
}
