var express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dataBaseConfig = require('./database/db');
app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB CONNECTED SUCCESS");
}, error => {
    console.log("Could not connect to database  " + error);
}

)


const studentRoute = require('./routes/student.route')
const { join } = require('path')


app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/frontend-server')))

app.use('/api', studentRoute)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/frontend-server/index.html'));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });