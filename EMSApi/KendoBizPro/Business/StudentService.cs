using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace KendoBizPro.Business
{
    public class StudentService
    {
        public readonly string _connectionString;
        public readonly IConfiguration configuration;

        public StudentService()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _connectionString = configuration.GetConnectionString("ProdConnection");
        }

        
    }
}
