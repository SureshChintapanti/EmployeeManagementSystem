/****** Object:  StoredProcedure [dbo].[ems_SP_02_save_registration]    Script Date: 19-03-2025 12:42:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ems_SP_02_save_registration]
    @Operation NVARCHAR(10),        -- 'INSERT' or 'UPDATE'
    @UserId INT = NULL,             -- Used for update
    @CompanyName NVARCHAR(100),
    @Industry NVARCHAR(100),
    @NumberOfEmployees INT,
    @Website NVARCHAR(255),
    @CompanyDescription NVARCHAR(500),
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @JobTitle NVARCHAR(100),
    @WorkEmail NVARCHAR(100),
    @PhoneNumber NVARCHAR(15),
    @StreetAddress NVARCHAR(255),
    @City NVARCHAR(100),
    @StateProvince NVARCHAR(100),
    @PostalCode NVARCHAR(20),
    @Country NVARCHAR(100),
    @Username NVARCHAR(50),
    @Password NVARCHAR(255),
    @ConfirmPassword NVARCHAR(255),
    @AgreeToTerms BIT,
    @NewUserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- INSERT operation
        IF @Operation = 'I'
        BEGIN
            INSERT INTO [dbo].[ems_table_01_Registration] (
                [CompanyName], [Industry], [NumberOfEmployees], [Website], [CompanyDescription],
                [FirstName], [LastName], [JobTitle], [WorkEmail], [PhoneNumber],
                [StreetAddress], [City], [StateProvince], [PostalCode], [Country],
                [Username], [Password], [ConfirmPassword], [AgreeToTerms]
            )
            VALUES (
                @CompanyName, @Industry, @NumberOfEmployees, @Website, @CompanyDescription,
                @FirstName, @LastName, @JobTitle, @WorkEmail, @PhoneNumber,
                @StreetAddress, @City, @StateProvince, @PostalCode, @Country,
                @Username, @Password, @ConfirmPassword, @AgreeToTerms
            );

            -- Return the newly generated UserId
            SET @NewUserId = SCOPE_IDENTITY();
        END
        -- UPDATE operation
        ELSE IF @Operation = 'U' AND @UserId IS NOT NULL
        BEGIN
            UPDATE [dbo].[ems_table_01_Registration]
            SET 
                [CompanyName] = @CompanyName,
                [Industry] = @Industry,
                [NumberOfEmployees] = @NumberOfEmployees,
                [Website] = @Website,
                [CompanyDescription] = @CompanyDescription,
                [FirstName] = @FirstName,
                [LastName] = @LastName,
                [JobTitle] = @JobTitle,
                [WorkEmail] = @WorkEmail,
                [PhoneNumber] = @PhoneNumber,
                [StreetAddress] = @StreetAddress,
                [City] = @City,
                [StateProvince] = @StateProvince,
                [PostalCode] = @PostalCode,
                [Country] = @Country,
                --[Username] = @Username, -- Username should not be updated
                [Password] = @Password,
                [ConfirmPassword] = @ConfirmPassword,
                [AgreeToTerms] = @AgreeToTerms
            WHERE [UserId] = @UserId;

            -- Return the updated UserId
            SET @NewUserId = @UserId;
        END
        ELSE
        BEGIN
            -- Handle invalid operation
            RAISERROR('Invalid operation or missing UserId for update.', 16, 1);
            RETURN;
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

