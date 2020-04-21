var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const customerRouter = require('./Controller/UserRoutes');
const productRouter = require('./Controller/ProductRoutes');
const bidRoutes = require('./Controller/BidRoutes');
const connection = require('./DatabaseConnection/dbConnection').mongoDBConnection();

console.log(connection);

var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/customers',customerRouter);
app.use('/products',productRouter);
app.use('/bids',bidRoutes);

app.get('/',(req,res)=>{
    res.send(`Server is running at port ${port}`)
})

app.listen(port)

module.exports = app;