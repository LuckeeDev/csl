FROM node:12.16.3

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn

RUN npm install

COPY . .

RUN yarn build:api

CMD ["yarn", "start:api"]
