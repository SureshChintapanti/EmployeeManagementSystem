using KendoBizPro.Business;
using KendoBizPro.Entity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;

namespace KendoBizPro.Controllers
{
    [Route("api/[controller]")]
    public class DepartmentController : Controller
    {

        [HttpGet("GetDepartments")]
        public IActionResult GetDepartments([FromQuery] string? sortColumn = "DepartmentName", [FromQuery] string? sortDirection = "ASC", [FromQuery] string? filterName = null, [FromQuery] string? UserIdentifier = null)
        {
            DataSet ds = new DataSet();
            Department _departmentService = new Department();
            ds = _departmentService.GetDepartments(sortColumn, sortDirection, filterName, UserIdentifier);
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



        [HttpPost("saveDepartment")]
        public IActionResult SaveDepartment([FromBody] DepartmentRequest request)
        {
            Department _departmentService = new Department();
            var result = _departmentService.SaveDepartment(request.Op_Operation, request.DepartmentName, request.UserIdentifier);
            return Ok(new { DepartmentID = result.DepartmentID, IsSuccess = result.Success });
        }

    }
    public class DepartmentRequest
    {
        public string Op_Operation { get; set; }
        public string DepartmentName { get; set; }
        public string UserIdentifier { get; set; }
    }
}