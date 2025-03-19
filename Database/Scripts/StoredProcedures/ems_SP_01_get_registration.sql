/****** Object:  StoredProcedure [dbo].[ems_SP_01_get_registration]    Script Date: 19-03-2025 12:41:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ems_SP_01_get_registration]
    @UserId INT = NULL -- Optional: Fetch a specific user by UserId
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @UserId IS NOT NULL
        BEGIN
            -- Fetch a single registration record by UserId
            SELECT 
                [UserId],
                [CompanyName],
                [Industry],
                [NumberOfEmployees],
                [Website],
                [CompanyDescription],
                [FirstName],
                [LastName],
                [JobTitle],
                [WorkEmail],
                [PhoneNumber],
                [StreetAddress],
                [City],
                [StateProvince],
                [PostalCode],
                [Country],
                [Username],
                [Password],
                [ConfirmPassword],
                [AgreeToTerms]
            FROM 
                [dbo].[ems_table_01_Registration]
            WHERE 
                [UserId] = @UserId;
        END
        ELSE
        BEGIN
            -- Fetch all registration records
            SELECT 
                [UserId],
                [CompanyName],
                [Industry],
                [NumberOfEmployees],
                [Website],
                [CompanyDescription],
                [FirstName],
                [LastName],
                [JobTitle],
                [WorkEmail],
                [PhoneNumber],
                [StreetAddress],
                [City],
                [StateProvince],
                [PostalCode],
                [Country],
                [Username],
                [Password],
                [ConfirmPassword],
                [AgreeToTerms]
            FROM 
                [dbo].[ems_table_01_Registration];
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

