-- Select Employees
CREATE PROCEDURE SelectEmployee
AS
BEGIN
    SELECT * FROM Employee;
END

-- Insert and Update Employee
CREATE PROCEDURE InsertUpdateEmployee
(
    @Id INTEGER,
    @Name NVARCHAR(50),
    @Age INTEGER,
    @State NVARCHAR(50),
    @Country NVARCHAR(50),
    @Action VARCHAR(10)
)
AS
BEGIN
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Employee (Name, Age, [State], Country) VALUES (@Name, @Age, @State, @Country);
    END

    IF @Action = 'Update'
    BEGIN
        UPDATE Employee
        SET Name = @Name, Age = @Age, [State] = @State, Country = @Country
        WHERE EmployeeID = @Id;
    END
END

-- Delete Employee
CREATE PROCEDURE DeleteEmployee
(
    @Id INTEGER
)
AS
BEGIN
    DELETE FROM Employee WHERE EmployeeID = @Id;
END






ALTER PROCEDURE InsertUpdateEmployee
(
    @Id INTEGER,
    @Name NVARCHAR(50),
    @Age INTEGER,
    @State NVARCHAR(50),
    @Country NVARCHAR(50),
    @Gender NVARCHAR(10),
    @Image VARBINARY(MAX),
    @Action VARCHAR(10)
)
AS
BEGIN
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Employee (Name, Age, [State], Country, Gender, Image)
        VALUES (@Name, @Age, @State, @Country, @Gender, @Image);
    END
    IF @Action = 'Update'
    BEGIN
        UPDATE Employee
        SET Name = @Name, Age = @Age, [State] = @State, Country = @Country, Gender = @Gender, Image = @Image
        WHERE EmployeeID = @Id;
    END
END


