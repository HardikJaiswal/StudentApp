
using StudentApp.Concerns;
using System.Collections.Generic;

namespace StudentApp.Contracts
{
    public interface IStudentService
    {
        public List<Student> GetStudents();

        public Student GetStudent(int id);

        public APIResponse DeleteStudent(int id);

        public APIResponse SaveStudent(Student student);
    }
}
