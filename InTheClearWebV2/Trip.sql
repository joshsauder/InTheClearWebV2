CREATE TABLE [dbo].[Trip] (
    [TripId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [Duration] [int] NOT NULL,
    [Distance] [int] NOT NULL,
    [CreatedAt] [datetime2](7) NOT NULL,
    PRIMARY KEY (TripId)
)