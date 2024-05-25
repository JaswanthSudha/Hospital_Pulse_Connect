require('dotenv').config();

const express = require("express");
const http = require("http");
const fs = require('fs');
const cors = require("cors")



const userRouterV1 = require('./routes/userRouteV1');
const childRouterV1 = require('./routes/childRouteV1');

const { checkForAuthenticationToken } = require('./middlewares/authentication');

const { connectMongoDb } = require('./connection');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Connection 
connectMongoDb(process.env.MONGO_CONNECTION_URL)
  .then((e) => console.log("Mongodb connected"));

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;

  fs.appendFile('log.txt', msg, () => { });
  next();
});

// User - Route
app.use('/api/v1/user', checkForAuthenticationToken(), userRouterV1);
app.use('/api/v1/child', childRouterV1);



server.listen(PORT, () => console.log(`server started at http://localhost:8001/`));