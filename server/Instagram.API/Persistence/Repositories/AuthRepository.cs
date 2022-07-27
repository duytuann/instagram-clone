using Instagram.API.Domain.Repositories;
using Instagram.API.Persistence.Contexts;
using Instagram.API.Domain.Models;
using Instagram.API.Resources;

namespace Instagram.API.Persistence.Repositories
{
    public class AuthRepository : BaseRepository, IAuthRepository
    {
        public AuthRepository(AppDbContext context) : base(context)
        {
        }

        public User AuthAsync(Login login)
        {
            // Find User
            User userAccount = _context.Users.FirstOrDefault(u => u.Email == login.UserName || u.Username == login.UserName);

            // Hash Password -> Comapre
            bool verified = BCrypt.Net.BCrypt.Verify(login.Password, userAccount.PassWord);

            if (userAccount == null)
                return null;

            if (!verified)
                return null;

            return userAccount;
        }
    }
}