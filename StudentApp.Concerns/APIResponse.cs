
namespace StudentApp.Concerns
{
    public class APIResponse
    {
        public bool IsSuccess { get; set; }

        public dynamic Data { get; set; }

        public string Message { get; set; }
    }
}
