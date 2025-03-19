/****** Object:  StoredProcedure [dbo].[ems_sp_05_add_delete_departments]    Script Date: 19-03-2025 12:43:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ems_sp_05_add_delete_departments]
    @Op_Operation CHAR(1),            -- 'I' for Insert, 'D' for Delete
    @DepartmentName VARCHAR(100),     -- Department name
    @UserId INT,                      -- UserId from the Registration table
    @DepartmentID INT OUTPUT,         -- Output parameter for DepartmentID
    @Success BIT OUTPUT               -- Output parameter for operation success
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DECLARE @RegisteredID INT;
        DECLARE @DEPID INT;

        -- Initialize output values
        SET @DepartmentID = NULL;
        SET @Success = 0;

        -- Validate UserId
        IF NOT EXISTS (SELECT 1 FROM [dbo].[ems_table_01_Registration] WHERE [UserId] = @UserId)
        BEGIN
            RAISERROR('User not found with the given UserId.', 16, 1);
            RETURN;
        END

        -- Insert operation
        IF @Op_Operation = 'I'
        BEGIN
            -- Check for uniqueness of the department name for the specific user
            IF EXISTS (
                SELECT 1 
                FROM [dbo].[ems_table_03_Departments]
                WHERE [DepartmentName] = @DepartmentName 
                  AND RegisteredID = @UserId
            )
            BEGIN
                RAISERROR('Department already exists for this user. Department names must be unique.', 16, 1);
                RETURN;
            END

            -- Calculate the next DepartmentID for the given UserId
            SELECT @DepartmentID = ISNULL(MAX([DepartmentID]), 0) + 1
            FROM [dbo].[ems_table_03_Departments]
            WHERE [RegisteredID] = @UserId;

            -- Insert a new department record
            INSERT INTO [dbo].[ems_table_03_Departments] (
                [DepartmentID], 
                [DepartmentName], 
                [EmployeeCount], 
                [RegisteredID]
            )
            VALUES (
                @DepartmentID, 
                @DepartmentName, 
                0, 
                @UserId
            );

            SET @Success = 1;
            PRINT 'Department inserted successfully.';
        END
        -- Delete operation
        ELSE IF @Op_Operation = 'D'
        BEGIN
            -- Get the DepartmentID to delete related employee records
            SELECT @DEPID = DepartmentID 
            FROM [dbo].[ems_table_03_Departments]
            WHERE [DepartmentName] = @DepartmentName
              AND [RegisteredID] = @UserId;

            -- Check if DepartmentID was found
            IF @DEPID IS NULL
            BEGIN
                RAISERROR('Department not found for deletion.', 16, 1);
                RETURN;
            END

            -- Delete related employee records
            DELETE FROM [dbo].[ems_table_02_Employees]
            WHERE [DepartmentID] = @DEPID
              AND UserID = @UserId;

            -- Delete the department record
            DELETE FROM [dbo].[ems_table_03_Departments]
            WHERE [DepartmentID] = @DEPID
              AND [RegisteredID] = @UserId;

            -- Check if any rows were affected
            IF @@ROWCOUNT > 0
            BEGIN
                SET @Success = 1;
                PRINT 'Department and related employees deleted successfully.';
            END
            ELSE
            BEGIN
                RAISERROR('Department not found for deletion.', 16, 1);
            END
        END
        ELSE
        BEGIN
            RAISERROR('Invalid operation. Use ''I'' for Insert or ''D'' for Delete.', 16, 1);
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
        RETURN;
    END CATCH
END;
GO

