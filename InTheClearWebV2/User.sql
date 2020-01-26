CREATE TABLE [dbo].[User] 
(
    Id BIGINT IDENTITY(0,1) PRIMARY KEY,
    FirstName VARCHAR(20),
    LastName VARCHAR(20),
    Email VARCHAR(30),
    Password VARCHAR(30),
    Salt Byte(16),
    CreatedAt DATETIME2(7),
    UpdatedAt DATETIME2(7)
);