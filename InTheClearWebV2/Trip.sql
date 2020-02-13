CREATE TABLE [dbo].[Trip] (
    [TripId] [uniqueidentifier] NOT NULL,
    [UserId] [varchar](128) NOT NULL,
    [Duration] [int] NOT NULL,
    [Distance] [int] NOT NULL,
    [CreatedAt] [datetime] NOT NULL,
    PRIMARY KEY (TripId)
)