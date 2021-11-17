# CSL

## What's this?

I originally started this project as a way for the students of my school to get involved in student activities during the quarantine.
After seeing what this idea could do, I decided to make it open source. The road is still long and I will need some help to accomplish this,
but in the mean time feel free to play with what I have here.

## How's the development of V2 taking place?

For version 2, which will be open for free to every school in the world, I decided to take a way more flexible approach. The previous version was
tailor-made for my school, but this one will be different. Students will be able to create school clubs, to sell gadgets and yearbooks, to order
at their school cafe, to start loyalty programs for their students... all from this web app! The dev branches are prefixed by `v2/` and the main
one is currently `v2/next`.

## Technology specifications

The technologies used to build this web app strive to bring the best performance/cost ratio for schools, in order to make it available to the greatest
number of students possible. The frontend is built with [NextJS 12](https://nextjs.org) and is thought to be hosted on [Vercel](https://vercel.com). The
backend is currently on [Strapi V3](https://strapi.io) with [PostgreSQL](https://www.postgresql.org), but will soon move on to [Strapi V4](https://strapi.io/v4). Previous versions also used Firebase, but we're trying to move away from it.

The repo uses some of the most advanced tools available in web development today: [Nx](https://nx.dev), [Eslint](https://eslint.org), [Prettier](https://prettier.io) and others. Running `yarn dev PROJECT_NAME` launches the projects, running `yarn build PROJECT_NAME` builds them.

## How to get involved?

I would love to get some help on this project! If you want to get involved, play around with some of the code and feel free to open a pull request or to contact me through an issue or via email at [luca@luckee.dev](mailto:luca@luckee.dev)!
