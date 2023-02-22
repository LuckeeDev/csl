---
sidebar_position: 3
---

# Connect a database

CSL uses [Prisma](https://prisma.io) under the hood to connect to a PostgreSQL database. Once you have Postgres set up on your machine, you must sync the database with the Prisma schema specified in the `prisma.schema` file at the root of the project. In order to do this, you have to set the `DATABASE_URL` environment variable and run the following command:

```
yarn prisma migrate dev
```

This will apply all migrations and sync the database schema with the Prisma schema.
