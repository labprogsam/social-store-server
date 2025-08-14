FROM node:20-alpine AS build

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run seed

ENV NODE_ENV=prd

EXPOSE 8000

CMD ["node", "src/server.js"]
