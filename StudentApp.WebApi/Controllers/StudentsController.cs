using Microsoft.AspNetCore.Mvc;
using StudentApp.Concerns;
using StudentApp.Contracts;

namespace StudentApp.Web.Controllers
{
    [Route("api/uiservice")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService studentService;

        public StudentsController([FromServices] IStudentService studentService)
        {
            this.studentService = studentService;
        }

        [HttpGet]
        public List<Student> GetStudent()
        {
            return studentService.GetStudents();
        }

        [HttpGet("{id}")]
        public Student GetStudent(int id)
        {
            return studentService.GetStudent(id);
        }

        [HttpDelete("{id}")]
        public APIResponse DeleteStudent(int id)
        {
            return studentService.DeleteStudent(id);
        }

        [HttpPost]
        public APIResponse AddStudent([FromBody]Student student)
        {
            return studentService.SaveStudent(student);
        }
    }
}
