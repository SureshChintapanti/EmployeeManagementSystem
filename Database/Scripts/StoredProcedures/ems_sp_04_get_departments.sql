/****** Object:  StoredProcedure [dbo].[ems_sp_04_get_departments]    Script Date: 19-03-2025 12:43:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ems_sp_04_get_departments]
    @SortColumn VARCHAR(50) = 'DepartmentName',  -- Column to sort by (default: DepartmentName)
    @SortDirection VARCHAR(4) = 'ASC',          -- Sort direction (ASC or DESC)
    @FilterName VARCHAR(100) = NULL,            -- Filter by department name (optional)
    @UserId INT = NULL                          -- UserId from the Registration table (optional)
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

        -- Fetch departments based on the UserId (if provided) and apply filtering and sorting
        SELECT 
            [DepartmentID],
            [DepartmentName],
            [EmployeeCount],
            [RegisteredID]
        FROM 
            [dbo].[ems_table_03_Departments]
        WHERE 
            (@FilterName IS NULL OR [DepartmentName] LIKE '%' + @FilterName + '%')
            AND (@UserId IS NULL OR [RegisteredID] = @UserId)
        ORDER BY 
            CASE WHEN @SortColumn = 'DepartmentName' AND @SortDirection = 'ASC' THEN [DepartmentName] END ASC,
            CASE WHEN @SortColumn = 'DepartmentName' AND @SortDirection = 'DESC' THEN [DepartmentName] END DESC,
            CASE WHEN @SortColumn = 'EmployeeCount' AND @SortDirection = 'ASC' THEN [EmployeeCount] END ASC,
            CASE WHEN @SortColumn = 'EmployeeCount' AND @SortDirection = 'DESC' THEN [EmployeeCount] END DESC;
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

