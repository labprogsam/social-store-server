FROM node:20-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 8008

CMD sh -c "npx prisma migrate deploy && node src/server.js"
