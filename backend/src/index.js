const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');


const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://AllStarEng:eng4682507895@cluster0-ph6p1.mongodb.net/omnistack?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
