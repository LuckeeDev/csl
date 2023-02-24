---
category: Setup
filename: environment
sidebar_position: 2
---

# Configure environment variables

Both the root of the project and the `apps/web` folder contain a `.env.example` file. Please make a copy of this file and save it as `.env` in the same location of the `.env.example` file. Here is where you should write the environment variables you want to be loaded when the project launches.

## Root environment

The root environment contains the following environment variables.

| Variable name  | Required           | Description                                                                                                                                     |
| -------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | :white_check_mark: | The full connection string to your PostgreSQL database. It must follow this structure: `postgresql://USER:PASSWORD@ADDRESS:PORT/DATABASE_NAME`. |

## App environment

The `apps/web` environment contains the following environment variables.

| Variable name                          | Required           | Description                                                                                                                                                                                                                                 |
| -------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`                     | :white_check_mark: | This is the **Client ID** of your Google Cloud project. It's used to make Google authentication work. You can create a new project from [the Google Cloud console](https://console.cloud.google.com/).                                      |
| `GOOGLE_CLIENT_SECRET`                 | :white_check_mark: | This is the **Client Secret** associated to your Google Cloud app ID.                                                                                                                                                                       |
| `NEXTAUTH_SECRET`                      | :white_check_mark: | A secure secret used to encrypt `NextAuth`'s data, which is used on sign up and when verifying what resources a user can access.                                                                                                            |
| `NEXTAUTH_URL`, `NEXT_PUBLIC_BASE_URL` | :white_check_mark: | These two variables should be set to the same value: the address you use to access the application. If you don't edit the default configuration, this should be `http://localhost:3000` on your local machine.                              |
| `ALLOWED_EMAIL_DOMAINS`                | :white_check_mark: | A comma-separated list of allowed email domains for the Google login.                                                                                                                                                                       |
| `AWS_ID`                               | :x:                | An [AWS](https://aws.amazon.com) account with access to an S3 bucket to upload static files. This is not necessary to start the application and have the basic funcionalities working. It's only needed when uploading images to the cloud. |
| `AWS_SECRET`                           | :x:                | The secret associated with the account specified in `AWS_ID`.                                                                                                                                                                               |
| `AWS_BUCKET`                           | :x:                | The [S3](https://aws.amazon.com/it/s3/) bucket where you want to store uploaded files.                                                                                                                                                      |
