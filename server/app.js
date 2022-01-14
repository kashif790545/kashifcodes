const express = require('express');
const http = require("http");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://kashif:kashif5656@cluster0.4inl4.mongodb.net/test?authSource=admin&replicaSet=atlas-4yic08-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
        console.log('Connected to Mongo database')
    }
    catch (e) {
        console.log(`Error connecting to mongo database ${e}`)
    }
}


let app = express();
const server = http.createServer(app)

//routes
const usersRouter = require('./routes/users')();
const adminRouter = require('./routes/admin')();

//middlewares
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser('cookiesecret'));


mongoConnect();

//routes middlewares heelo
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
module.exports = app;

app.get('/', (req, res) => {
    res.send('hello')
})


//server
server.listen(3001, () => console.log(`server running on port ${3001}`));

