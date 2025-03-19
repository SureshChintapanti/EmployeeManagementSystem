using KendoBizPro.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KendoBizPro.Business
{
    public class Department
    {

        public DataSet GetDepartments(string? sortColumn = "EmployeeName", string? sortDirection = "ASC", string? filterName = null, string? UserId = null)
        {
            DataSet ds = new DataSet();
            StudentService studentService = new StudentService();
            SqlConnection con = new SqlConnection(studentService._connectionString);
            try
            {
                SqlCommand cmd = new SqlCommand("[ems_sp_04_get_departments]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@SortColumn", sortColumn);
                cmd.Parameters.AddWithValue("@SortDirection", sortDirection);
                cmd.Parameters.AddWithValue("@FilterName", filterName ?? (object)DBNull.Value);

                con.Open();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(ds);

            }
            catch
            {

            }
            finally
            {
                con.Close();
            }

            return ds;
        }

        public class DepartmentResult
        {
            public int DepartmentID { get; set; }
            public bool Success { get; set; }
        }

        public DepartmentResult SaveDepartment(string? Op_Operation = null, string? DepartmentName = null, string? UserIdentifier = null)
        {
            DepartmentResult result = new DepartmentResult();

            try
            {
                StudentService studentService = new StudentService();

                using (SqlConnection conn = new SqlConnection(studentService._connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("[ems_sp_05_add_delete_departments]", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Add input parameters
                        cmd.Parameters.AddWithValue("@Op_Operation", Op_Operation ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DepartmentName", DepartmentName ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@UserId", UserIdentifier ?? (object)DBNull.Value);

                        // Add output parameters
                        cmd.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int) { Direction = ParameterDirection.Output });
                        cmd.Parameters.Add(new SqlParameter("@Success", SqlDbType.Bit) { Direction = ParameterDirection.Output });

                        conn.Open();
                        cmd.ExecuteNonQuery();

                        // Retrieve output values
                        result.DepartmentID = (int)(cmd.Parameters["@DepartmentID"].Value ?? 0);
                        result.Success = (bool)(cmd.Parameters["@Success"].Value ?? false);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception if needed
                result.DepartmentID = 0;
                result.Success = false;
            }

            return result;
        }

    }
}
