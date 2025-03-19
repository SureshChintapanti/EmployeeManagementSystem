/****** Object:  StoredProcedure [dbo].[ems_sp_03_check_login]    Script Date: 19-03-2025 12:42:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ems_sp_03_check_login]
    @Username NVARCHAR(50),        -- Username for login
    @Password NVARCHAR(255),       -- Password for login
    @IsValid BIT OUTPUT,           -- Output: 1 if login is valid, 0 otherwise
    @RegisteredID INT OUTPUT       -- Output: UserId if login is valid, NULL otherwise
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Initialize output variables
        SET @IsValid = 0;
        SET @RegisteredID = NULL;

        -- Check if the username and password match in the Registration table
        IF EXISTS (
            SELECT 1
            FROM [dbo].[ems_table_01_Registration]
            WHERE [Username] = @Username
              AND [Password] = @Password
        )
        BEGIN
            -- Fetch the UserId and set the output variables
            SELECT @RegisteredID = [UserId]
            FROM [dbo].[ems_table_01_Registration]
            WHERE [Username] = @Username
              AND [Password] = @Password;

            SET @IsValid = 1;  -- Login successful
        END
        ELSE
        BEGIN
            SET @IsValid = 0;  -- Login failed
            SET @RegisteredID = NULL;
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

