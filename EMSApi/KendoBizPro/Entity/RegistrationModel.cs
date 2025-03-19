namespace KendoBizPro.Entity
{
    public class RegistrationModel
    {

        // Company Information
        public string? CompanyName { get; set; }
        public string? Industry { get; set; }
        public int NumberOfEmployees { get; set; }
        public string? Website { get; set; }
        public string? CompanyDescription { get; set; }

        // Primary Contact
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? JobTitle { get; set; }
        public string? WorkEmail { get; set; }
        public string? PhoneNumber { get; set; }

        // Address
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? StateProvince { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }

        // Account Setup
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public bool AgreeToTerms { get; set; }


        public string? Operation { get; set; }
        public int? RegisteredID { get; set; }
    }
}
