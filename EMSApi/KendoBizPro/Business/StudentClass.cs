using KendoBizPro.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System.Data;

namespace KendoBizPro.Business
{
    public class StudentClass()
    {
        public DataSet GetStudents()
        {
            DataSet ds = new DataSet();
            StudentService studentService = new StudentService();
            SqlConnection con = new SqlConnection(studentService._connectionString);

            try
            {
                con.Open();
                string query = "SELECT * FROM STUDENTS";
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(ds);
            }

            catch (Exception)
            {
                throw;
            }

            return ds;

        }
    }
}
