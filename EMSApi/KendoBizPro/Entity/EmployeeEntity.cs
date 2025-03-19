namespace KendoBizPro.Entity
{
    public class EmployeeEntity
    {
        public string Ip_operation { get; set; }
        public int EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? HomeAddress { get; set; }
        public int? DepartmentID { get; set; }

        public string? Position { get; set; }
        public DateTime StartDate { get; set; }
        public decimal Salary { get; set; }
        public string? ContactName { get; set; }
        public string? Relationship { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? Notes { get; set; }
        public string? EmployeeFullName { get; set; }
        public string? UserIdentifier { get; set; }
        public string? EmploymentStatus { get; set; }

        public DateTime? JoinDate { get; set; }

        public string? DepartmentName { get; set; }
    }
}
