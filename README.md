# CSL

## What's this?

I originally started this project as a way for the students of my school to get involved in student activities during the quarantine.
After seeing what this idea could become, I decided to make it open source. The road is still long and I will need some help to accomplish this,
but in the mean time feel free to play with what I have here.

## The initial product

The first version of the web app was made in Angular, Express, MongoDB and Firebase. Unfortunately, this was a poor tech stack for what I was trying to create and it lead to issues in scalability when I decided to pivot towards a "school-agnostic" approach for this project.

## How's the development of V2 going?

For version 2, which will be free and open source for every school in the world, I decided to take a way more flexible approach. The previous version was
tailor-made for my school, but this one will be different. Students will be able to create school clubs, sell gadgets and yearbooks, order
at their school cafe, organize events, start loyalty programs for members of the school... all from one web app! The dev branches are prefixed by `v2/` and the main one is currently `v2/dev`.

## Technology specifications

The technologies used to build this web app strive to bring the best performance/cost ratio for schools, in order to make it available to the greatest
number of students possible. The frontend is built with [NextJS 12](https://nextjs.org) and is thought to be hosted on [Vercel](https://vercel.com). The
backend is based on NextJS API routes and interacts with [PostgreSQL](https://www.postgresql.org) through [Prisma](https://prisma.io).

The repo uses some of the most advanced tools available in web development today: [Nx](https://nx.dev), [Eslint](https://eslint.org), [Prettier](https://prettier.io) and others. Running `yarn dev web` launches the project, running `yarn build web` builds it.

## How can I get involved?

I would love to get some help on this project! If you want to get involved, play around with some of the code and feel free to open a pull request with new changes. You can contact me here on GitHub through the Issues tab or via email at [luca@luckee.dev](mailto:luca@luckee.dev).
