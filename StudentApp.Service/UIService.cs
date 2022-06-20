using RepoDb;
using RepoDb.Enumerations;
using StudentApp.Concerns;
using StudentApp.Contracts;
using System;

namespace StudentApp.Service
{
    public class UIService : IUIService
    {
        private DbService dbService;
        private readonly string tableName = "[dbo].[Students]";
        private readonly string deleteQuery = "DELETE FROM [dbo].[Students] ";
        private readonly string selectAllQuery = "SELECT * FROM [dbo].[Students] ";


        public UIService(DbService dbService)
        {
            this.dbService = dbService;
        }

        public APIResponse AddStudent(Student student)
        {
            APIResponse response = new();
            try
            {
                response.Data = dbService.Add<Student>(tableName, student);
                response.IsSuccess = true;
            }
            catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
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
                dbService.ExecuteNonQuery(deleteQuery + whereClause,where);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }


        public APIResponse GetAllStudents()
        {
            APIResponse response = new();
            try
            {
                response.Data = dbService.ExecuteQuery<Student>(selectAllQuery,null);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse GetStudent(int id)
        {
            var where = new[]
            {
                new QueryField("Id",Operation.Equal, id)
            };
            APIResponse response = new();
            try
            {
                response.Data = dbService.Get<Student>(tableName, where);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        public APIResponse UpdateStudent(Student student)
        {
            APIResponse response = new();
            try
            {
                dbService.Update<Student>(student, tableName);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }
    }
}
