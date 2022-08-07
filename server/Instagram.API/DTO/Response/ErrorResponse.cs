namespace Instagram.API.DTO.Response;

public class ErrorResponse
{
    public bool Success => false;
    public List<string> Messages { get; private set; }

    public ErrorResponse(List<string> messages)
    {
        this.Messages = messages ?? new List<string>();
    }

    public ErrorResponse(string message)
    {
        this.Messages = new List<string>();

        if (!string.IsNullOrWhiteSpace(message))
        {
            this.Messages.Add(message);
        }
    }
}
