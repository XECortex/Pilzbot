# Config for the container should be placed at /var/node/pilzbot/config

FROM node:latest

WORKDIR /var/node/pilzbot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# EXPOSE 8080

CMD [ "node", "main.js" ]