using KendoBizPro.Business;
using KendoBizPro.Entity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Text.Json;

namespace KendoBizPro.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {

        [HttpGet("GetEmployees")]
        public IActionResult GetEmployees([FromQuery] string? sortColumn = "EmployeeFullName", [FromQuery] string? sortDirection = "ASC", [FromQuery] string? filterName = null, [FromQuery] string? filterStatus = null, [FromQuery] int? UserId = null)
        {
            DataSet ds = new DataSet();
            Employee _employeeService = new Employee();
            ds = _employeeService.GetEmployees(sortColumn, sortDirection, filterName, filterStatus, UserId);
            var jsonResult = new object();
            if (ds.Tables[0].Rows.Count > 0)
            {
                jsonResult = new
                {

                    data = JsonConvert.SerializeObject(ds.Tables[0]),
                    Status = "Ok"
                };
            }
            else
            {
                jsonResult = new
                {

                    Status = "No Records Found"
                };
            }


            return Ok(jsonResult);
        }

        [HttpPost("saveEmployee")]
        public IActionResult SaveEmployee([FromBody] EmployeeEntity employee)
        {
            if (employee == null)
                return BadRequest("Invalid employee data.");
            Employee _employeeService = new Employee();

            var result = _employeeService.SaveEmployee(employee);

            return Ok(result);
        }

        [HttpGet("get-employee")]
        public IActionResult GetEmployee([FromQuery] int employeeId, [FromQuery] int userId)
        {
            try
            {
                Employee _employeeService = new Employee();
                EmployeeEntity employeeEntity = _employeeService.GetEmployeeById(employeeId, userId);

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = null
                };

                return new JsonResult(employeeEntity, options);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
