using KendoBizPro.Entity;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KendoBizPro.Business
{
    public class Employee
    {



        public DataSet GetEmployees(string? sortColumn = "EmployeeFullName", string? sortDirection = "ASC", string? filterName = null, string? filterStatus = null, int? UserId = null)
        {
            DataSet ds = new DataSet();
            StudentService studentService = new StudentService();

            try
            {
                using (SqlConnection con = new SqlConnection(studentService._connectionString))
                using (SqlCommand cmd = new SqlCommand("ems_sp_06_get_employees", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", UserId);
                    cmd.Parameters.AddWithValue("@SortColumn", sortColumn);
                    cmd.Parameters.AddWithValue("@SortDirection", sortDirection);
                    cmd.Parameters.AddWithValue("@FilterName", filterName ?? (object)DBNull.Value);

                    con.Open();
                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(ds);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception message (you can use a logging framework)
                Console.WriteLine($"Error: {ex.Message}");
            }

            return ds;
        }



        public bool SaveEmployee(EmployeeEntity employee)
        {
            try
            {
                // Initialize the service (if needed)
                StudentService studentService = new StudentService();

                using (SqlConnection conn = new SqlConnection(studentService._connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("[ems_sp_07_manage_employees]", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Prepare parameters as a dictionary
                        var parameters = new Dictionary<string, object>
                {
                    { "@Op_Operation", employee.Ip_operation }, // Operation type: 'I', 'U', or 'D'
                    { "@EmployeeID", employee.EmployeeId }, // Required for Update and Delete
                    { "@EmployeeFullName", employee.EmployeeFullName },
                    { "@DepartmentID", employee.DepartmentID },
                    { "@FirstName", employee.FirstName },
                    { "@LastName", employee.LastName },
                    { "@EmploymentStatus", employee.EmploymentStatus },
                    { "@JoinDate", employee.StartDate },
                    { "@HomeAddress", employee.HomeAddress },
                    { "@EmergencyContactName", employee.ContactName },
                    { "@EmergencyContactRelationship", employee.Relationship },
                    { "@EmergencyContactPhone", employee.EmergencyPhone },
                    { "@Notes", employee.Notes },
                    { "@Email", employee.Email },
                    { "@PhoneNumber", employee.PhoneNumber },
                    { "@StartDate", employee.StartDate },
                    { "@Salary", employee.Salary },
                    { "@JobPosition", employee.Position },
                    { "@UserID", employee.UserIdentifier } // UserID from the Registration table
                };

                        // Add parameters to the SQL command
                        foreach (var param in parameters)
                        {
                            cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
                        }

                        // Add output parameter for success
                        SqlParameter successParam = new SqlParameter("@Success", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(successParam);

                        conn.Open();
                        cmd.ExecuteNonQuery();

                        // Get the output parameter value
                        bool success = (bool)successParam.Value;
                        return success;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception (if needed)
                // Example: _logger.LogError(ex, "Error saving employee data.");
                return false;
            }
        }


        public EmployeeEntity GetEmployeeById(int employeeId, int userId)
        {
            EmployeeEntity employee = null;
            StudentService studentService = new StudentService();
            SqlConnection conn = new SqlConnection(studentService._connectionString);
            try
            {

                using (SqlCommand cmd = new SqlCommand("[dbo].[ems_sp_08_get_employee_by_id]", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Add parameters
                    cmd.Parameters.AddWithValue("@EmployeeID", employeeId);
                    cmd.Parameters.AddWithValue("@UserID", userId);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            employee = new EmployeeEntity
                            {
                                EmployeeId = reader.GetInt32(reader.GetOrdinal("EmployeeID")),
                                EmployeeFullName = reader.GetString(reader.GetOrdinal("EmployeeFullName")),
                                DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName")),
                                DepartmentID = reader.GetInt32(reader.GetOrdinal("DepartmentID")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                EmploymentStatus = reader.IsDBNull(reader.GetOrdinal("EmploymentStatus")) ? null : reader.GetString(reader.GetOrdinal("EmploymentStatus")),
                                JoinDate = reader.IsDBNull(reader.GetOrdinal("JoinDate")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("JoinDate")),
                                HomeAddress = reader.IsDBNull(reader.GetOrdinal("HomeAddress")) ? null : reader.GetString(reader.GetOrdinal("HomeAddress")),
                                ContactName = reader.IsDBNull(reader.GetOrdinal("EmergencyContactName")) ? null : reader.GetString(reader.GetOrdinal("EmergencyContactName")),
                                Relationship = reader.IsDBNull(reader.GetOrdinal("EmergencyContactRelationship")) ? null : reader.GetString(reader.GetOrdinal("EmergencyContactRelationship")),
                                EmergencyPhone = reader.IsDBNull(reader.GetOrdinal("EmergencyContactPhone")) ? null : reader.GetString(reader.GetOrdinal("EmergencyContactPhone")),
                                Notes = reader.IsDBNull(reader.GetOrdinal("Notes")) ? null : reader.GetString(reader.GetOrdinal("Notes")),
                                Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? null : reader.GetString(reader.GetOrdinal("Email")),
                                PhoneNumber = reader.IsDBNull(reader.GetOrdinal("PhoneNumber")) ? null : reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                StartDate = (DateTime)(reader.IsDBNull(reader.GetOrdinal("StartDate")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("StartDate"))),
                                Salary = (decimal)(reader.IsDBNull(reader.GetOrdinal("Salary")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("Salary"))),
                                Position = reader.IsDBNull(reader.GetOrdinal("JobPosition")) ? null : reader.GetString(reader.GetOrdinal("JobPosition")),
                            };
                        }
                    }


                };
            }
            catch (Exception ex)
            {
                // Log exception (if needed)
                throw new Exception("Error fetching employee details.", ex);
            }

            return employee;
        }
    }
}
