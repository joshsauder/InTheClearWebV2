FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

COPY InTheClearWebV2/bin/Release/netcoreapp3.1/publish/ app/

ENTRYPOINT ["dotnet", "app/InTheClearWebV2.dll"]