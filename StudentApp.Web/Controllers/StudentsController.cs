using Microsoft.AspNetCore.Mvc;
using StudentApp.Concerns;
using StudentApp.Contracts;
using StudentApp.Service;

namespace StudentApp.Web.Controllers
{
    [Route("api/uiservice")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private IUIService uiService;

        public StudentsController([FromServices] IUIService uiService)
        {
            this.uiService = uiService;
        }

        [HttpGet("getstudents")]
        public APIResponse GetStudent()
        {
            return uiService.GetAllStudents();
        }

        [HttpGet("getstudent")]
        public APIResponse GetStudent(int id)
        {
            return uiService.GetStudent(id);
        }

        [HttpDelete("deletestudent")]
        public APIResponse DeleteStudent(int id)
        {
            return uiService.DeleteStudent(id);
        }

        [HttpPost("addstudent")]
        public APIResponse AddStudent([FromBody]Student student)
        {
            return uiService.AddStudent(student);
        }

        [HttpPost("updatestudent")]
        public APIResponse UpdateStudent([FromBody]Student student)
        {
            return uiService.UpdateStudent(student);
        }
    }
}
