const express = require('express');
//const swaggerUI = require('swagger-ui-express');
const _connect = require('./config/_connect');
require('dotenv').config();
const {isAdmin, isOwner, isAuthenticated} = require('./middlewares/index');

//connection with MongoDB
_connect()

const app = express();
app.use(express.json());

app.use('/api/v1.1/auth', require('./routes/authRouter'));
app.listen(3000, () => console.log(`Aplicación escuchando a través del ${process.env.port}`));