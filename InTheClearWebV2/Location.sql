CREATE TABLE [dbo].[Location](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[City] [nvarchar](max) NOT NULL,
	[Condition] [nvarchar](max) NULL,
    [Temperature] [nvarchar](max) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[TripId] [uniqueidentifier] NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (TripId) REFERENCES [Trip](TripId)
)

