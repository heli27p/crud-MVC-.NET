insert into Employee (Name, Age, State, Country, Gender, Image)
values ('bb', 66, 'bb', 'bb', 'male', (select * from openrowset(BULK 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS01\MSSQL\img\download.jfif', SINGLE_BLOB) as image));

select * from Employee



