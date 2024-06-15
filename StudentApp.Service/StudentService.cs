using RepoDb;
using RepoDb.Enumerations;
using StudentApp.Concerns;
using StudentApp.Contracts;
using System;
using System.Collections.Generic;

namespace StudentApp.Service
{
    public class StudentService : IStudentService
    {
        private DbService dbService;
        private readonly string studentTableName = "[dbo].[Students]";
        private readonly string errorlogTable = "[dbo].[ErrorLog]";
        private readonly string deleteStudentQuery = "DELETE FROM [dbo].[Students] ";
        private readonly string selectAllStudentQuery = "SELECT * FROM [dbo].[Students] ";


        public StudentService(DbService dbService)
        {
            this.dbService = dbService;
        }

        public APIResponse SaveStudent(Student student)
        {
            APIResponse response = new();
            try
            {
                if(student.Id == 0)
                {
                    response.Data = dbService.Add(studentTableName, student);
                }
                else
                {
                    dbService.Update(student, studentTableName);
                }
                response.IsSuccess = true;
            }
            catch(Exception e)
            {
                ErrorLog log = CreateErrorLog(e);
                dbService.Add(errorlogTable, log);
                response.IsSuccess = false;
            }
            return response;
        }

        public APIResponse DeleteStudent(int id)
        {
            var where = new[]
            {
                new QueryField("Id", Operation.Equal, id)
            };
            string whereClause = "WHERE Id = @Id";
            APIResponse response = new();
            try
            {
                dbService.ExecuteNonQuery(deleteStudentQuery + whereClause,where);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                ErrorLog log = CreateErrorLog(e);
                dbService.Add(errorlogTable, log);
                response.IsSuccess = false;
            }
            return response;
        }


        public List<Student> GetStudents()
        {
            List<Student> result;
            try
            {
                result = ConvertToList(dbService.ExecuteQuery<Student>(selectAllStudentQuery,null));
            }
            catch (Exception e)
            {
                ErrorLog log = CreateErrorLog(e);
                dbService.Add(errorlogTable, log);
                return null;
            }
            return result;
        }

        public Student GetStudent(int id)
        {
            var where = new[]
            {
                new QueryField("Id",Operation.Equal, id)
            };
            Student result;
            try
            {
                result = dbService.Get<Student>(studentTableName, where);
            }
            catch (Exception e)
            {
                ErrorLog log = CreateErrorLog(e);
                dbService.Add(errorlogTable, log);
                return null;
            }
            return result;
        }

        private List<T> ConvertToList<T>(IEnumerable<T> values)
        {
            List<T> result = new List<T>();
            var iterator = values.GetEnumerator();
            result.Add(iterator.Current);
            while (iterator.MoveNext())
            {
                result.Add( iterator.Current );
            }
            return result;
        }

        private ErrorLog CreateErrorLog(Exception e)
        {
            ErrorLog result = new()
            {
                Source = e.Source,
                StackTrace = e.StackTrace,
                Cause = e.Message
            };
            return result;
        }
    }
}
