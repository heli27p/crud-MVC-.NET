USE [Employee]
GO
/****** Object:  StoredProcedure [dbo].[InsertUpdateEmployee]    Script Date: 26-07-2024 14:24:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Insert and Update Employee
ALTER PROCEDURE [dbo].[InsertUpdateEmployee]
(
    @Id INTEGER,
    @Name NVARCHAR(50),
    @Age INTEGER,
    @State NVARCHAR(50),
    @Country NVARCHAR(50),
	@Gender NVARCHAR(10),
    @ImagePath NVARCHAR(255),
    @Action VARCHAR(10)
)
AS
BEGIN
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Employee (Name, Age, [State], Country) 
		VALUES (
			@Name, 
			@Age, 
			@State, 
			@Country, 
			@Gender, 
			(SELECT * FROM OPENROWSET(BULK @ImagePath, SINGLE_BLOB) AS Image)
		);
    END

    IF @Action = 'Update'
    BEGIN
        UPDATE Employee
        SET Name = @Name, 
			Age = @Age, 
			[State] = @State, 
			Country = @Country,
			Gender = @Gender,
            Image = (SELECT * FROM OPENROWSET(BULK @ImagePath, SINGLE_BLOB) AS Image)
        WHERE EmployeeID = @Id;
    END
END