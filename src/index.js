const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const errorHandler = require('./middleware/errorHandler');

const config = require('./config');
const authRoute = require('./routes/auth');
const refreshRoute = require('./routes/refresh');
const registerRoute = require('./routes/register');

const app = new Koa();
const router = new Router();

app.use(errorHandler);
app.use(cors());

router.post('/auth', bodyParser(), authRoute);
router.post('/refresh', bodyParser(), refreshRoute);
router.post('/register', bodyParser(), registerRoute);

const port = process.env.PORT || config.port;
console.log('Running on port ' + port);

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || port);
