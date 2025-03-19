/****** Object:  Table [dbo].[ems_table_01_Registration]    Script Date: 19-03-2025 12:27:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ems_table_01_Registration](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](100) NULL,
	[Industry] [nvarchar](100) NULL,
	[NumberOfEmployees] [int] NULL,
	[Website] [nvarchar](255) NULL,
	[CompanyDescription] [nvarchar](500) NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[JobTitle] [nvarchar](100) NULL,
	[WorkEmail] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](15) NULL,
	[StreetAddress] [nvarchar](255) NULL,
	[City] [nvarchar](100) NULL,
	[StateProvince] [nvarchar](100) NULL,
	[PostalCode] [nvarchar](20) NULL,
	[Country] [nvarchar](100) NULL,
	[Username] [nvarchar](50) NULL,
	[Password] [nvarchar](255) NULL,
	[ConfirmPassword] [nvarchar](255) NULL,
	[AgreeToTerms] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


