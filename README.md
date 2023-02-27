[![CodeQL](https://github.com/LuckeeDev/csl/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/LuckeeDev/csl/actions/workflows/codeql-analysis.yml)

# CSL

## What's this?

I originally started this project as a way for the students of my school to get involved in student activities during the quarantine.
After seeing what this idea could become, I decided to make it open source. The road is still long and I will need some help to accomplish this,
but in the mean time feel free to play with what I have here.

## How's the development of V2 going?

For version 2, which will be free and open source for every school in the world, I decided to take a way more flexible approach. The previous version was
tailor-made for my school, but this one will be different. Students will be able to create school clubs, sell gadgets and yearbooks, order
at their school cafe, organize events, start loyalty programs for members of the school... all from one web app! Development happens in the `dev` branch,
which is then merged into the `main` branch when all updates are release-ready.

## Technology specifications

The technologies used to build this web app strive to bring the best performance/cost ratio for schools, in order to make it available to the greatest
number of students possible. The frontend is built with [NextJS 13](https://nextjs.org) and is thought to be hosted on [Vercel](https://vercel.com). The
backend is based on NextJS API routes and interacts with [PostgreSQL](https://www.postgresql.org) through [Prisma](https://prisma.io).

The repo uses some of the most advanced tools available in web development today: [Nx](https://nx.dev), [Eslint](https://eslint.org), [Prettier](https://prettier.io) and others. Running `yarn dev web` launches the project, running `yarn build web` builds it. To learn more about how the project works, please visit the [official documentation website](https://docs.cslussana.com).

## How can I get involved?

I would love to get some help on this project! If you want to get involved, play around with some of the code and feel free to open a pull request with new changes.
