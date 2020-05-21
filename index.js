const express = require('express');
const app = express();
const morgan =require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require('http');

const userRoutes = require('./routers/user');

app.use('/user', userRoutes);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// fetch('http://localhost:8080/posts', { mode: 'no-cors' });
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTION') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); 
    }
    next();
});

const url =
  "mongodb+srv://Khadeem:ademola123@cluster0-sb6zf.mongodb.net/test?retryWrites=true&w=majority";
// mongoose
//   .connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   })
//   .then((res) => {
//     console.log("successful");
//   })
//   .catch((err) => console.log(err));

mongoose
.connect(url, {
    useCreateIndex: true,
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then((res) => {
        console.log("successful");
      })
      .catch((err) => console.log(err));

// const app = require('./app');

const port = process.env.PORT || 2000;

const server = http.createServer(app);

server.listen(port);

// const port = process.env.PORT || 2000;
// app.listen(port, () => {
//     console.log(`listening on ${port}`);
// });


// app.use ('/', (req, res, next) =>{
//     res.status(200).json({
//         message: 'It works!'
//     });

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
  next();
    const error = new Error("Not found");
    error.status = 404;
    next(error);
    
})

app.use((error, req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
  next();
    res.status(error.status || 500);
    res.json({
        error: {
            message:    error.message
            
        }
    });
});

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Behold The MEVN Stack!'
//     });
// });

module.exports = app;