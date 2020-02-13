CREATE TABLE [dbo].[User] 
(
    Id VARCHAR(128) PRIMARY KEY,
    DisplayName NVARCHAR(MAX),
    Email NVARCHAR(60) NOT NULL,
    Paid Bit NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME
);

ALTER TABLE [dbo].[User] WITH CHECK 
   ADD CONSTRAINT UQ_User_Email UNIQUE (Email)