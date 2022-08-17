namespace Instagram.API.DTO.Request;

public class GetCommentRequest
{
    public string PostId { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}