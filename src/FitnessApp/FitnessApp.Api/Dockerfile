#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FitnessApp.Api/FitnessApp.Api.csproj", "FitnessApp.Api/"]
COPY ["FitnessApp.Infrastructure/FitnessApp.Infrastructure.csproj", "FitnessApp.Infrastructure/"]
COPY ["FitnessApp.Application/FitnessApp.Application.csproj", "FitnessApp.Application/"]
COPY ["FitnessApp.Domain/FitnessApp.Domain.csproj", "FitnessApp.Domain/"]
COPY ["FitnessApp.Contracts/FitnessApp.Contracts.csproj", "FitnessApp.Contracts/"]
RUN dotnet restore "FitnessApp.Api/FitnessApp.Api.csproj"
COPY . .
WORKDIR "/src/FitnessApp.Api"
RUN dotnet build "FitnessApp.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FitnessApp.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FitnessApp.Api.dll"]