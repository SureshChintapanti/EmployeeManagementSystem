/****** Object:  Table [dbo].[ems_table_02_Employees]    Script Date: 19-03-2025 12:36:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ems_table_02_Employees](
	[EmployeeID] [int] NOT NULL,
	[EmployeeFullName] [varchar](200) NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[EmploymentStatus] [nvarchar](50) NULL,
	[JoinDate] [date] NULL,
	[HomeAddress] [nvarchar](255) NULL,
	[EmergencyContactName] [nvarchar](100) NULL,
	[EmergencyContactRelationship] [nvarchar](50) NULL,
	[EmergencyContactPhone] [nvarchar](20) NULL,
	[Notes] [varchar](max) NULL,
	[Email] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[StartDate] [date] NULL,
	[Salary] [decimal](18, 0) NULL,
	[JobPosition] [nvarchar](100) NULL,
	[UserID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC,
	[UserID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


