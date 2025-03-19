using KendoBizPro.Business;
using KendoBizPro.Entity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace KendoBizPro.Controllers
{
    [Route("api/[controller]")]

    public class BaseController : Controller
    {
        //public readonly StudentClass studentClass;
        //public BaseController(StudentClass studentClass)
        //{
        //    this.studentClass = studentClass;
        //} 



        [HttpGet("GetMeassages")]
        public IActionResult GetMeassages()
        {
            return Ok(new { msg = "message success" });
        }

        [HttpGet("GetAllStudents")]
        public IActionResult GetAllStudents()
        {
            DataSet ds = new DataSet();

            StudentClass studentClass = new StudentClass();
            ds = studentClass.GetStudents();
            var jsonResult = new
            {

                data = JsonConvert.SerializeObject(ds.Tables[0]),
                Status = "Ok"
            };

            return Ok(jsonResult);
        }
        [HttpGet("GetEmployees")]
        public IActionResult GetEmployees()
        {
            DataSet ds = new DataSet();
            Employee _employeeService = new Employee();
            //ds = _employeeService.GetEmployees(sortColumn, sortDirection, filterName, filterStatus);
            var jsonResult = new
            {

                data = JsonConvert.SerializeObject(ds.Tables[0]),
                Status = "Ok"
            };

            return Ok(jsonResult);
        }

    }
}
