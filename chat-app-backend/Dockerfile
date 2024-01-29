FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./src ./src
RUN npm install 
EXPOSE 4000
CMD ["node", "server.js"]