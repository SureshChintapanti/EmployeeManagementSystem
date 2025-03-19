/****** Object:  StoredProcedure [dbo].[ems_sp_06_get_employees]    Script Date: 19-03-2025 12:44:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[ems_sp_06_get_employees]
    @SortColumn VARCHAR(50) = 'EmployeeFullName',  -- Column to sort by (default: EmployeeFullName)
    @SortDirection VARCHAR(4) = 'ASC',            -- Sort direction (ASC or DESC)
    @FilterName VARCHAR(100) = NULL,              -- Filter by employee full name (optional)
    @UserId INT = NULL                            -- UserId from the Registration table (optional)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Validate UserId
        IF @UserId IS NOT NULL
        BEGIN
            -- Check if the UserId exists in the Registration table
            IF NOT EXISTS (SELECT 1 FROM [dbo].[ems_table_01_Registration] WHERE [UserId] = @UserId)
            BEGIN
                RAISERROR('User not found with the given UserId.', 16, 1);
                RETURN;
            END
        END

        -- Fetch employees based on the UserId (if provided) and apply filtering and sorting
        SELECT EmployeeID, EmployeeFullName, etd.DepartmentName, FirstName, LastName, EmploymentStatus, JoinDate, HomeAddress, EmergencyContactName, EmergencyContactRelationship, EmergencyContactPhone, Notes, Email, PhoneNumber, StartDate, Salary, JobPosition, UserID
        FROM 
            [dbo].[ems_table_02_Employees]
			INNER JOIN ems_table_03_Departments etd ON (etd.RegisteredID = @UserId AND etd.DepartmentID = ems_table_02_Employees.DepartmentID) 
        WHERE 
            (@FilterName IS NULL OR [EmployeeFullName] LIKE '%' + @FilterName + '%')
            AND (@UserId IS NULL OR [UserID] = @UserId)
        ORDER BY 
            CASE WHEN @SortColumn = 'EmployeeFullName' AND @SortDirection = 'ASC' THEN [EmployeeFullName] END ASC,
            CASE WHEN @SortColumn = 'EmployeeFullName' AND @SortDirection = 'DESC' THEN [EmployeeFullName] END DESC,
            CASE WHEN @SortColumn = 'FirstName' AND @SortDirection = 'ASC' THEN [FirstName] END ASC,
            CASE WHEN @SortColumn = 'FirstName' AND @SortDirection = 'DESC' THEN [FirstName] END DESC,
            CASE WHEN @SortColumn = 'LastName' AND @SortDirection = 'ASC' THEN [LastName] END ASC,
            CASE WHEN @SortColumn = 'LastName' AND @SortDirection = 'DESC' THEN [LastName] END DESC,
            CASE WHEN @SortColumn = 'DepartmentName' AND @SortDirection = 'ASC' THEN DepartmentName END ASC,
            CASE WHEN @SortColumn = 'DepartmentName' AND @SortDirection = 'DESC' THEN DepartmentName END DESC;
    END TRY
    BEGIN CATCH
        -- Handle errors
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
        RETURN;
    END CATCH
END;
GO

