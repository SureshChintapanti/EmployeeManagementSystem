/****** Object:  StoredProcedure [dbo].[ems_sp_08_get_employee_by_id]    Script Date: 19-03-2025 12:44:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[ems_sp_08_get_employee_by_id]
    @EmployeeID INT,  -- EmployeeID to fetch details
    @UserID INT      -- UserID to validate the employee
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Fetch employee details based on EmployeeID and UserID
        SELECT 
            [EmployeeID],
            [EmployeeFullName],
            [DepartmentID],
			(SELECT etd.DepartmentName 
     FROM ems_table_03_Departments etd 
     WHERE etd.DepartmentID = ems_table_02_Employees.DepartmentID 
       AND etd.RegisteredID = @UserID) AS DepartmentName,
            [FirstName],
            [LastName],
            [EmploymentStatus],
            [JoinDate],
            [HomeAddress],
            [EmergencyContactName],
            [EmergencyContactRelationship],
            [EmergencyContactPhone],
            [Notes],
            [Email],
            [PhoneNumber],
            [StartDate],
            [Salary],
            [JobPosition],
            [UserID]
        FROM 
            [dbo].[ems_table_02_Employees]
        WHERE 
            [EmployeeID] = @EmployeeID
            AND [UserID] = @UserID;

        -- If no rows are returned, raise an error
        IF @@ROWCOUNT = 0
        BEGIN
            RAISERROR('Employee not found with the given EmployeeID and UserID.', 16, 1);
        END
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
    END CATCH
END;
GO

