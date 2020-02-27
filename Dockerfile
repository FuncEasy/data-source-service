FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src/ ./src
WORKDIR /usr/src/app/src
CMD ["node", "app.js"]