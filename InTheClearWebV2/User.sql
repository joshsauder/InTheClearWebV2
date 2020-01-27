CREATE TABLE [dbo].[User] 
(
    Id BIGINT IDENTITY(0,1) PRIMARY KEY,
    FirstName NVARCHAR(MAX),
    LastName NVARCHAR(MAX),
    Email NVARCHAR(50) NOT NULL,
    Password NVARCHAR(MAX),
    Salt BINARY(32),
    CreatedAt DATETIME,
    UpdatedAt DATETIME
);

ALTER TABLE [dbo].[User] WITH CHECK 
   ADD CONSTRAINT UQ_User_Email UNIQUE (Email)