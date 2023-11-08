namespace FitnessApp.Contracts.UniqueResponse;

public class UniqueResponse<T> 
{
    public int ErrorCode { get; set; }
    public List<string> Errors { get; set; } = new List<string>();
    public T? Data { get; set; }
} 