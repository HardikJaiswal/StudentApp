using RepoDb;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;

namespace StudentApp.Service
{
    public class DbService
    {
        private readonly string connectionString;

        public DbService(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public T Get<T>(string tableName,object where) where T : class
        {
            T result;
            using(var connection = new SqlConnection(connectionString))
            {
                result = connection.Query<T>(tableName, where).FirstOrDefault();
            }
            return result;
        }

        public IEnumerable<T> ExecuteQuery<T>(string query,object queryParams)
        {
            IEnumerable<T> result;
            using (var connection = new SqlConnection(connectionString))
            {
                result = connection.ExecuteQuery<T>(query, queryParams);
            }
            return result;
        }

        public void ExecuteNonQuery(string query, object queryParams)
        {
            using(var connection = new SqlConnection(connectionString))
            {
                connection.ExecuteNonQuery(query, queryParams);
            }
        }

        public void Update<T>(T entity, string tableName) where T : class
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Update(tableName, entity);
            }
        }

        public int Add<T>(string tableName,T entity)
        {
            int result;
            using (var connection = new SqlConnection(connectionString))
            {
                result = (int)connection.Insert(tableName, entity);
            }
            return result;
        }
    }
}
