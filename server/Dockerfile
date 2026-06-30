FROM node:20
WORKDIR /myApp
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]
