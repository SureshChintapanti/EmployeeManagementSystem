namespace KendoBizPro.Business
{
    // This namespace contains business logic classes for a student management system.

    // Encapsulation: Hiding internal implementation details and exposing only necessary information through public methods.
    public class Student
    {
        // Private fields to store student's ID and name.
        private int _id;
        private string? _name;

        // Public method to set student's ID and name.
        public void SetStudent(int Id, string Name)
        {
            // Assign values to private fields.
            _id = Id;
            _name = Name;
        }

        // Public method to get student's information as a string.
        public string GetStudent()
        {
            // Return a formatted string containing student's ID and name.
            return _id + " " + _name;
        }
    }

    // Inheritance: Creating a new class that inherits properties and methods from an existing class (Student).
    public class GraduateStudent : Student
    {
        // Private field to store graduate student's degree.
        private string? Degree { get; set; }

        // Public method to set graduate student's degree.
        public void SetDegree(string degree)
        {
            // Assign value to private field.
            Degree = degree;
        }

        // Public method to get graduate student's information as a string.
        public string GetGraduateInfo()
        {
            // Use base class's GetStudent() method to get student's information and append degree information.
            return $"{GetStudent()}, Degree: {Degree}";
        }
    }

    // Interface: Defining a contract that must be implemented by any class that implements it.
    public interface IStudentService
    {
        // Method to get student's information as a string.
        string GetStudentInfo();
    }

    // Class that implements IStudentService interface.
    public class OOPSBusiness : IStudentService
    {
        // Virtual method to get student's information as a string.
        public virtual string GetStudentInfo()
        {
            // Create a new GraduateStudent object.
            GraduateStudent student = new GraduateStudent();
            // Set student's ID and name.
            student.SetStudent(101, "Suresh");
            // Set graduate student's degree.
            student.SetDegree("Master's in CS");

            // Return graduate student's information as a string.
            return student.GetGraduateInfo();
        }

        // ✅ Using StudentOperations for Method Overloading
        // Method to get student's information by ID.
        public string GetStudentById(int id)
        {
            // Create a new StudentOperations object.
            StudentOperations operations = new StudentOperations();
            // Call GetStudentInfo() method with ID parameter.
            return operations.GetStudentInfo(id);
        }

        // Method to get student's information by name.
        public string GetStudentByName(string name)
        {
            // Create a new StudentOperations object.
            StudentOperations operations = new StudentOperations();
            // Call GetStudentInfo() method with name parameter.
            return operations.GetStudentInfo(name);
        }

        // Method to get student's information by ID and name.
        public string GetStudentByIdAndName(int id, string name)
        {
            // Create a new StudentOperations object.
            StudentOperations operations = new StudentOperations();
            // Call GetStudentInfo() method with ID and name parameters.
            return operations.GetStudentInfo(id, name);
        }
    }

    // ✅ Polymorphism: Method Overloading (Compile-time Polymorphism)
    // Class that demonstrates method overloading.
    public class StudentOperations
    {
        // Method to get student's information by ID.
        public string GetStudentInfo(int id)
        {
            // Return a formatted string containing student's ID.
            return $"Student ID: {id}";
        }

        // Method to get student's information by name.
        public string GetStudentInfo(string name)
        {
            // Return a formatted string containing student's name.
            return $"Student Name: {name}";
        }

        // Method to get student's information by ID and name.
        public string GetStudentInfo(int id, string name)
        {
            // Return a formatted string containing student's ID and name.
            return $"Student ID: {id}, Name: {name}";
        }
    }
}