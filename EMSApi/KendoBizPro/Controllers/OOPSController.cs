using KendoBizPro.Business;
using Microsoft.AspNetCore.Mvc;

namespace KendoBizPro.Controllers
{
    public class OOPSController : ControllerBase
    {

        private readonly OOPSBusiness oopsBusiness;

        public OOPSController(OOPSBusiness _oopsBusiness)
        {
            oopsBusiness = _oopsBusiness;
        }


        [HttpGet("GetStudentById/{id}")]
        public IActionResult GetStudentById(int id)
        {
            var studentDetails = oopsBusiness.GetStudentById(id);
            return Ok(studentDetails);
        }

        [HttpGet("GetStudentByName/{name}")]
        public IActionResult GetStudentByName(string name)
        {
            var studentDetails = oopsBusiness.GetStudentByName(name);
            return Ok(studentDetails);
        }

        [HttpGet("GetStudentByIdAndName/{id}/{name}")]
        public IActionResult GetStudentByIdAndName(int id, string name)
        {
            var studentDetails = oopsBusiness.GetStudentByIdAndName(id, name);
            return Ok(studentDetails);
        }



    }
}
