FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "dev"]