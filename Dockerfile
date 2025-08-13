FROM node:20
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 8000
CMD ["node", "src/server.js"]
