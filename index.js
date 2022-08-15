let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDB = require('./database/db');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB.db, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("DB Connected successfully")
},
error => {
    console.log("Data base error:" +error)
})

const bookRoute = require('./node-backend/routes/book.routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.use(express.static(path.join(__dirname,'dist/bookshop')));

app.use('/api', bookRoute);

const port = 8000;

app.listen(port, () => {
    console.log('Listening Port is on:', +port);
})


app.use((req, res, next)=>{
    next(createError(404));
});

app.get('/', (req, res)=>{
    res.send('INVALID ENDPOINT');
});


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/bookshop/index.html'));
});

app.use(function(err, req, res, next){
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});