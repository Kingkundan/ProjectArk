using ArkUploadService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArkUploadService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUpload : ControllerBase
    {
        // GET: api/<FileUpload>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<FileUpload>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FileUpload>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] List<IFormFile> files)
        {
            try
            {
                List<FileDetails> Responses = new();
                foreach (var file in files)
                {
                    string StatusCode = string.Empty;
                    string FileName = file.FileName;
                    if (file == null || file.Length == 0)
                        StatusCode = "File is Empty";
                    else
                    {

                        var DirectoryPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Upload\");
                        var filePath = Path.Combine(DirectoryPath, file.FileName);

                        if (!Directory.Exists(DirectoryPath))
                        {

                            Directory.CreateDirectory(DirectoryPath);
                        }

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        StatusCode = "File Uploaded Successfully !";
                    }
                    FileDetails resp = new() { FileName = FileName, UploadStatus = StatusCode };
                    Responses.Add(resp);
                }

                
                return new JsonResult(Responses);

            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // PUT api/<FileUpload>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FileUpload>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
