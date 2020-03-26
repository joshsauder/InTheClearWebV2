# In The Clear Web App

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

A web-app that gives the user all the features of the [iOS App](https://itunes.apple.com/us/app/in-the-clear/id1458058092?ls=1&mt=8). This app has been released and can be viewed at [https://app.intheclearapp.com](https://app.intheclearapp.com). It was deployed using AWS ECS, and the AWS Application Load Balancer

## Tech Stack

1. [ReactJS](https://reactjs.org) - Javascript Framework
2. [Bootstrap](https://getbootstrap.com) - CSS Framework
3. [Redux](https://redux.js.org) - State Manager
4. [Jest](https://jestjs.io) - Javascript Test Framework
5. [Enzyme](https://enzymejs.github.io/enzyme/) - React Test Framework
3. [.Net Core](https://docs.microsoft.com/en-us/dotnet/core/) - Backend Framework
4. [AWS RDS SQL Server](https://aws.amazon.com/rds/sqlserver/) - Database
5. [Docker](https://www.docker.com) - Delivers software in containers
6. [Google Maps API](https://developers.google.com/maps/documentation) - Mapping Service

## AWS Lambda Functions

The AWS Lambda functions, that were used in the iOS app, are also being utilized in this project. Currently, there are two Lambda functions that handle all weather and reverse geocoding requests. The following [link](https://github.com/joshsauder/InTheClearBackend) will take you to the In The Clear Backend Github Repo.
