/****** Object:  StoredProcedure [dbo].[ems_sp_07_manage_employees]    Script Date: 19-03-2025 12:44:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ems_sp_07_manage_employees]
    @Op_Operation CHAR(1),                        -- 'I' for Insert, 'U' for Update, 'D' for Delete
    @EmployeeID INT = NULL,                       -- EmployeeID (required for Update and Delete)
    @EmployeeFullName VARCHAR(200) = NULL,        -- Employee full name
    @DepartmentID INT = NULL,                     -- DepartmentID
    @FirstName VARCHAR(100) = NULL,               -- First name
    @LastName VARCHAR(100) = NULL,                -- Last name
    @EmploymentStatus NVARCHAR(50) = NULL,        -- Employment status
    @JoinDate DATE = NULL,                        -- Join date
    @HomeAddress NVARCHAR(255) = NULL,            -- Home address
    @EmergencyContactName NVARCHAR(100) = NULL,   -- Emergency contact name
    @EmergencyContactRelationship NVARCHAR(50) = NULL, -- Emergency contact relationship
    @EmergencyContactPhone NVARCHAR(20) = NULL,   -- Emergency contact phone
    @Notes VARCHAR(MAX) = NULL,                   -- Notes
    @Email NVARCHAR(100) = NULL,                  -- Email
    @PhoneNumber NVARCHAR(20) = NULL,             -- Phone number
    @StartDate DATE = NULL,                       -- Start date
    @Salary DECIMAL(18, 0) = NULL,                -- Salary
    @JobPosition NVARCHAR(100) = NULL,            -- Job position
    @UserID INT,                                  -- UserID from the Registration table
    @Success BIT OUTPUT                           -- Output parameter for operation success
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Initialize output values
        SET @Success = 0;

        -- Validate UserId
        IF NOT EXISTS (SELECT 1 FROM [dbo].[ems_table_01_Registration] WHERE [UserId] = @UserID)
        BEGIN
            RAISERROR('User not found with the given UserId.', 16, 1);
            RETURN;
        END

        -- Insert operation
        IF @Op_Operation = 'I'
        BEGIN
            -- Check for required fields
            IF @EmployeeFullName IS NULL OR @DepartmentID IS NULL OR @FirstName IS NULL OR @LastName IS NULL OR @UserID IS NULL
            BEGIN
                RAISERROR('Required fields are missing for Insert operation.', 16, 1);
                RETURN;
            END

            -- Calculate the next EmployeeID for the given UserId
            SELECT @EmployeeID = ISNULL(MAX([EmployeeID]), 0) + 1
            FROM [dbo].[ems_table_02_Employees]
            WHERE [UserID] = @UserID;

            -- Insert a new employee record
            INSERT INTO [dbo].[ems_table_02_Employees] (
                [EmployeeID], [EmployeeFullName], [DepartmentID], [FirstName], [LastName],
                [EmploymentStatus], [JoinDate], [HomeAddress], [EmergencyContactName],
                [EmergencyContactRelationship], [EmergencyContactPhone], [Notes], [Email],
                [PhoneNumber], [StartDate], [Salary], [JobPosition], [UserID]
            )
            VALUES (
                @EmployeeID, @EmployeeFullName, @DepartmentID, @FirstName, @LastName,
                @EmploymentStatus, @JoinDate, @HomeAddress, @EmergencyContactName,
                @EmergencyContactRelationship, @EmergencyContactPhone, @Notes, @Email,
                @PhoneNumber, @StartDate, @Salary, @JobPosition, @UserID
            );

            -- Increment the department's employee count
            UPDATE ems_table_03_Departments
            SET EmployeeCount = EmployeeCount + 1
            WHERE DepartmentID = @DepartmentID AND RegisteredID = @UserID;

            SET @Success = 1;
            PRINT 'Employee inserted successfully.';
        END

        -- Update operation
        ELSE IF @Op_Operation = 'U'
        BEGIN
            -- Check for required fields
            IF @EmployeeID IS NULL OR @UserID IS NULL
            BEGIN
                RAISERROR('EmployeeID and UserID are required for Update operation.', 16, 1);
                RETURN;
            END

            -- Get the old department ID before update
            DECLARE @OldDepartmentID INT;
            SELECT @OldDepartmentID = DepartmentID
            FROM [dbo].[ems_table_02_Employees]
            WHERE EmployeeID = @EmployeeID AND UserID = @UserID;

            -- Update the employee record
            UPDATE [dbo].[ems_table_02_Employees]
            SET 
                [EmployeeFullName] = ISNULL(@EmployeeFullName, [EmployeeFullName]),
                [DepartmentID] = ISNULL(@DepartmentID, [DepartmentID]),
                [FirstName] = ISNULL(@FirstName, [FirstName]),
                [LastName] = ISNULL(@LastName, [LastName]),
                [EmploymentStatus] = ISNULL(@EmploymentStatus, [EmploymentStatus]),
                [JoinDate] = ISNULL(@JoinDate, [JoinDate]),
                [HomeAddress] = ISNULL(@HomeAddress, [HomeAddress]),
                [EmergencyContactName] = ISNULL(@EmergencyContactName, [EmergencyContactName]),
                [EmergencyContactRelationship] = ISNULL(@EmergencyContactRelationship, [EmergencyContactRelationship]),
                [EmergencyContactPhone] = ISNULL(@EmergencyContactPhone, [EmergencyContactPhone]),
                [Notes] = ISNULL(@Notes, [Notes]),
                [Email] = ISNULL(@Email, [Email]),
                [PhoneNumber] = ISNULL(@PhoneNumber, [PhoneNumber]),
                [StartDate] = ISNULL(@StartDate, [StartDate]),
                [Salary] = ISNULL(@Salary, [Salary]),
                [JobPosition] = ISNULL(@JobPosition, [JobPosition])
            WHERE 
                [EmployeeID] = @EmployeeID AND [UserID] = @UserID;

            -- Update the department count if department changed
            IF @OldDepartmentID <> @DepartmentID
            BEGIN
                UPDATE ems_table_03_Departments
                SET EmployeeCount = EmployeeCount - 1
                WHERE DepartmentID = @OldDepartmentID AND RegisteredID = @UserID;

                UPDATE ems_table_03_Departments
                SET EmployeeCount = EmployeeCount + 1
                WHERE DepartmentID = @DepartmentID AND RegisteredID = @UserID;
            END

            SET @Success = 1;
            PRINT 'Employee updated successfully.';
        END

        -- Delete operation
        ELSE IF @Op_Operation = 'D'
        BEGIN
            -- Decrement the employee count before deleting
            UPDATE ems_table_03_Departments
            SET EmployeeCount = EmployeeCount - 1
            WHERE DepartmentID = @DepartmentID AND RegisteredID = @UserID;

            -- Delete the employee record
            DELETE FROM [dbo].[ems_table_02_Employees]
            WHERE [EmployeeID] = @EmployeeID AND [UserID] = @UserID;

            SET @Success = 1;
            PRINT 'Employee deleted successfully.';
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

