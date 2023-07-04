FROM node:17-alpine

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

# Build the app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]