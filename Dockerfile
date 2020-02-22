FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base

WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["InTheClearWebV2/InTheClearWebV2.csproj", "InTheClearWebV2/"]
RUN dotnet restore "InTheClearWebV2/InTheClearWebV2.csproj"
COPY . .
WORKDIR "/src/InTheClearWebV2"
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
RUN dotnet build "InTheClearWebV2.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "InTheClearWebV2.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "InTheClearWebV2.dll"]
