require('dotenv').config();

const express = require("express");
const http = require("http");
const fs = require('fs');
const cors = require("cors")
const bodyParser = require("body-parser")



const userRouterV1 = require('./routes/userRouteV1');
const childRouterV1 = require('./routes/childRouteV1');
const imageRouterV1 = require("./routes/imageRouteV1")
const appointmentRouterV1 = require("./routes/appointmentRouteV1")
const doctorRouterV1 = require("./routes/doctorRouteV1")
const documentRouterV1 = require("./routes/documentRouterV1")
const payementRouterV1 = require("./routes/paymentRouteV1")
const subscriptionRouterV1 = require("./routes/subscriptionRouterV1")

const { checkForAuthenticationToken } = require('./middlewares/authentication');

const { connectMongoDb } = require('./connection');

const app = express();
const server = http.createServer(app);
const PORT = 4000;

// Connection 
connectMongoDb(process.env.MONGO_CONNECTION_URL)
  .then((e) => console.log("Mongodb connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;

  fs.appendFile('log.txt', msg, () => { });
  next();
});

// User - Route
app.use('/api/v1/user', checkForAuthenticationToken(), userRouterV1);
app.use('/api/v1/child', childRouterV1);
app.use("/api/v1/image", imageRouterV1)
app.use("/api/v1/appointment", appointmentRouterV1)
app.use("/api/v1/doctor", doctorRouterV1)
app.use("/api/v1/document", documentRouterV1)
app.use("/api/v1/payment", payementRouterV1)
app.use("/api/v1/subscription", subscriptionRouterV1)



server.listen(PORT, () => console.log(`running on port ${PORT}`));