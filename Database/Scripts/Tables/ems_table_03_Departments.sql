/****** Object:  Table [dbo].[ems_table_03_Departments]    Script Date: 19-03-2025 12:38:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ems_table_03_Departments](
	[DepartmentID] [int] NOT NULL,
	[DepartmentName] [varchar](200) NOT NULL,
	[EmployeeCount] [int] NULL,
	[RegisteredID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC,
	[RegisteredID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ems_table_03_Departments] ADD  DEFAULT ((0)) FOR [EmployeeCount]
GO


