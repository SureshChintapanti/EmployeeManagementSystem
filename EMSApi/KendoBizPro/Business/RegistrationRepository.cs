using KendoBizPro.Entity;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KendoBizPro.Business
{
    public class RegistrationRepository
    {

        public int SaveRegistration(RegistrationModel registration)
        {
            int newUserId = 0;
            StudentService studentService = new StudentService();

            using (SqlConnection conn = new SqlConnection(studentService._connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("[ems_SP_02_save_registration]", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Add parameters
                    cmd.Parameters.AddWithValue("@Operation", registration.Operation);
                    cmd.Parameters.AddWithValue("@UserId", registration.RegisteredID);

                    cmd.Parameters.AddWithValue("@CompanyName", registration.CompanyName);
                    cmd.Parameters.AddWithValue("@Industry", registration.Industry);
                    cmd.Parameters.AddWithValue("@NumberOfEmployees", registration.NumberOfEmployees);
                    cmd.Parameters.AddWithValue("@Website", registration.Website);
                    cmd.Parameters.AddWithValue("@CompanyDescription", registration.CompanyDescription);
                    cmd.Parameters.AddWithValue("@FirstName", registration.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", registration.LastName);
                    cmd.Parameters.AddWithValue("@JobTitle", registration.JobTitle);
                    cmd.Parameters.AddWithValue("@WorkEmail", registration.WorkEmail);
                    cmd.Parameters.AddWithValue("@PhoneNumber", registration.PhoneNumber);
                    cmd.Parameters.AddWithValue("@StreetAddress", registration.StreetAddress);
                    cmd.Parameters.AddWithValue("@City", registration.City);
                    cmd.Parameters.AddWithValue("@StateProvince", registration.StateProvince);
                    cmd.Parameters.AddWithValue("@PostalCode", registration.PostalCode);
                    cmd.Parameters.AddWithValue("@Country", registration.Country);
                    cmd.Parameters.AddWithValue("@Username", registration.Username);
                    cmd.Parameters.AddWithValue("@Password", registration.Password);
                    cmd.Parameters.AddWithValue("@ConfirmPassword", registration.ConfirmPassword);
                    cmd.Parameters.AddWithValue("@AgreeToTerms", registration.AgreeToTerms);

                    // Output parameter
                    SqlParameter outputParam = new SqlParameter("@NewUserId", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(outputParam);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                    newUserId = Convert.ToInt32(outputParam.Value);
                }
            }

            return newUserId;
        }

        public (bool, int) CheckLogin(string username, string password)
        {
            StudentService studentService = new StudentService();
            try
            {
                using (SqlConnection conn = new SqlConnection(studentService._connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("ems_sp_03_check_login", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Input parameters
                        cmd.Parameters.AddWithValue("@Username ", username);
                        cmd.Parameters.AddWithValue("@Password", password);

                        // Output parameters
                        SqlParameter isValidParam = new SqlParameter("@IsValid", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        SqlParameter registeredIdParam = new SqlParameter("@RegisteredID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(isValidParam);
                        cmd.Parameters.Add(registeredIdParam);

                        // Open connection and execute the command
                        conn.Open();
                        cmd.ExecuteNonQuery();

                        // Get the output values
                        bool isValid = Convert.ToBoolean(isValidParam.Value);
                        if (isValid)
                        {
                            int registeredId = Convert.ToInt32(registeredIdParam.Value);
                            return (isValid, registeredId);

                        }
                        else
                        {

                            return (isValid, 0);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                throw new Exception("Error while checking login: " + ex.Message);
            }
        }

        public RegistrationModel? GetRegistrationDetails(int? RegisteredID = null)
        {
            try
            {
                StudentService studentService = new StudentService();

                using (SqlConnection conn = new SqlConnection(studentService._connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("[ems_SP_01_get_registration]", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Add the UserIdentifier parameter
                        cmd.Parameters.AddWithValue("@UserId", RegisteredID ?? (object)DBNull.Value);

                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return new RegistrationModel
                                {
                                    CompanyName = reader["CompanyName"]?.ToString(),
                                    Industry = reader["Industry"]?.ToString(),
                                    NumberOfEmployees = Convert.ToInt32(reader["NumberOfEmployees"] ?? 0),
                                    Website = reader["Website"]?.ToString(),
                                    CompanyDescription = reader["CompanyDescription"]?.ToString(),
                                    FirstName = reader["FirstName"]?.ToString(),
                                    LastName = reader["LastName"]?.ToString(),
                                    JobTitle = reader["JobTitle"]?.ToString(),
                                    WorkEmail = reader["WorkEmail"]?.ToString(),
                                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                                    StreetAddress = reader["StreetAddress"]?.ToString(),
                                    City = reader["City"]?.ToString(),
                                    StateProvince = reader["StateProvince"]?.ToString(),
                                    PostalCode = reader["PostalCode"]?.ToString(),
                                    Country = reader["Country"]?.ToString(),
                                    Username = reader["Username"]?.ToString(),
                                    Password = reader["Password"]?.ToString(),
                                    ConfirmPassword = reader["ConfirmPassword"]?.ToString(),
                                    AgreeToTerms = Convert.ToBoolean(reader["AgreeToTerms"] ?? false)
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception if needed
                Console.WriteLine($"Error: {ex.Message}");
            }

            return null;
        }
    }

}

