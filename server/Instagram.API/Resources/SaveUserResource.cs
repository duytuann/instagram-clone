using System.ComponentModel.DataAnnotations;

namespace Instagram.API.Resources
{
    public class SaveUserResource
    {
        [Required]
        [MaxLength(20)]
        public string? Email { get; set; }

        [Required]
        public string? PassWord { get; set; }

        [Required]
        public string? Gender { get; set; }

        [Required]
        [MaxLength(20)]
        public string? Username { get; set; }

        public string? Bio { get; set; }

        public string? PhoneNumber { get; set; }
    }
}