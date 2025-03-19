using KendoBizPro.Business;
using KendoBizPro.Entity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    
    [HttpPost("save")]
    public IActionResult SaveRegistration([FromBody] RegistrationModel registration)
    {
        try
        {
            RegistrationRepository registrationRepository = new RegistrationRepository();
            int userId = registrationRepository.SaveRegistration(registration);
            return Ok(new { UserId = userId, Message = "Registration successful!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("login")]
    public IActionResult Login([FromQuery] string? Username = null, [FromQuery] string? Password = null)
    {

        RegistrationRepository registrationRepository = new RegistrationRepository();

        var (isValid, registeredId) = registrationRepository.CheckLogin(Username,Password);
     
        return Ok(new { UserId = registeredId });
    

    }

    [HttpGet("getRegistrationDetails")]
    public IActionResult GetRegistrationDetails([FromQuery] int? RegisteredID = null)
    {
        RegistrationRepository registrationRepository = new RegistrationRepository();

        var result = registrationRepository.GetRegistrationDetails(RegisteredID);

        return Ok(result);
    }
}
