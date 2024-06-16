using Microsoft.AspNetCore.Http;

namespace ArkSystem.Models
{
    public class FileUploadModel
    {
        public IFormFile? File { get; set; }
    }
}
