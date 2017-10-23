const express = require('express');
const middlewareReactHelmet = require('./middleware-react-helmet');

const app = express();

app.use(express.static('public'));

app.use(middlewareReactHelmet());

app.listen(process.env.PORT || 3000);
