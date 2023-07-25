require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configurar CORS
app.use(cors());
app.use(require('./routes/benefits'));
app.use(require('./routes/category'));
app.use(require('./routes/faqs'));
app.use(require('./routes/products'));
app.use(require('./routes/promotions'));
app.use(require('./routes/tags'));
app.use(require('./routes/users'));
app.use(require('./routes/payment'));
app.use(require('./routes/login'))

mongoose.connect('mongodb://127.0.0.1:27017/marketFree')
    .then(() => {
        console.log('Database online');
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err);
    })

app.listen(process.env.PORT, () => {
    console.log('Server online on port', process.env.PORT);
});
