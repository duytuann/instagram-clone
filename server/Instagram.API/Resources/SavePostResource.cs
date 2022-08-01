namespace Instagram.API.Resources;

public class SavePostResource
{
    // public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string? Caption { get; set; }

    public FormFile? Image { get; set; }
}