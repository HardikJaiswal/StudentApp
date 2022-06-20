
using StudentApp.Concerns;

namespace StudentApp.Contracts
{
    public interface IUIService
    {
        public APIResponse GetAllStudents();

        public APIResponse GetStudent(int id);

        public APIResponse DeleteStudent(int id);

        public APIResponse UpdateStudent(Student student);

        public APIResponse AddStudent(Student student);
    }
}
