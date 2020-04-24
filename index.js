var express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const yamljs = require('yamljs');
const socketio = require('socket.io')
const http = require('http')

var app = express();
const server = http.createServer(app)
const io = socketio(server)

io.on('connection',(socket)=>{
    console.log(' new user Connected')
    socket.on('newBid',(newBid)=>{
        console.log("newBidSocket",newBid);
        io.emit('BidListUpdation', newBid)
    })
    socket.on('disconnect',()=>{
        console.log('User left')
    })
})

const customerRouter = require('./Controller/UserRoutes');
const productRouter = require('./Controller/ProductRoutes');
const bidRoutes = require('./Controller/BidRoutes');
const connection = require('./DatabaseConnection/dbConnection').mongoDBConnection();

const swaggerDocument = yamljs.load('./swagger.yaml');

console.log(connection);

var PORT = process.env.port || 4000;

app.use('/bidding', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/customers',customerRouter);
app.use('/products',productRouter);
app.use('/bids',bidRoutes);

app.get('/',(req,res)=>{
    res.send(`Server is running at port ${PORT}`)
})

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

module.exports = {
    app: app,
    io: io
};