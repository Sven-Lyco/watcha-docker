# Watcha-Docker

## `Description`

![Watcha](/public/images/header.png)

### An app for everyone who likes to watch movies and series

Watcha helps you to discover new movies and series and add them to your watchlist. You can mark individual films and episodes of a series as watched, so that you always know which film you have already seen or where you stopped in a series. On the individual detail pages you get information about the film or series. Furthermore, you can decide whether you want to have the background image or the trailer displayed on the detail pages. Happy Watching! 🍿 📺

**Important:** This web-app is optimized for mobile screen!

## `Tech Stack`

- [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [React Player](https://github.com/CookPete/react-player)
- [Jest](https://jestjs.io/)
- [Styled Components](https://styled-components.com/)
- [TMDB API](https://www.themoviedb.org/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB Atlas](https://www.mongodb.com/de-de/cloud/atlas/register)
- [mongoose](https://mongoosejs.com/)

## `Project Setup`

- Clone this repository
- Use `.env.example` to create your own `.env` inside the root folder
  - Add your `API_KEY` from [TMDB](https://www.themoviedb.org/)
  - Add your `MONGODB_URI`
- To run the application with docker use `$ docker compose up`
- If you want to start the application with npm:
  - Install all dependencies for client via `$ cd client && npm install`
  - add a proxy in client/package.json: `"proxy": "http://localhost:4000"`
  - Install all dependencies for server via `$ cd api && npm install`
  - Run server via `$ cd api && npm run dev`
  - Run client via `$ cd client && npm start`
- Open http://localhost:3000/ to view it in the browser
- Run tests via `$ npm test`

### Side Note

> All data comes from [The Movie Database API](https://www.themoviedb.org/)
> , the data of providers comes from JustWatch in partnership with The Movie Database API.
> This product uses the TMDB API but is not endorsed or certified by TMDB.
