const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('src/server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const userdb = JSON.parse(fs.readFileSync('./src/server/users.json', 'UTF-8'));

const SECRET_KEY = '123456789';
const expiresIn = '1h';


// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
async function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in database
function isAuthenticated({ identifier, password }) {
  console.log(userdb);
  return userdb.users.findIndex(user => user.identifier === identifier
     && user.password === password) !== -1;
}

// verifica credenziali e invia token todo: fornire Nome Cognome e admin
server.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!isAuthenticated({ identifier, password })) {
    const status = 401;
    console.log('dasasasad');
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ identifier, admin: true });
  console.log('accesstoken cre', accessToken);
  res.status(200).json({ token: accessToken });
});

// verifica token ad ogni richiesta tranne che nella route precedente
/* eslint-disable consistent-return */
server.all('*', async (req, res, next) => {
  console.log('path', req.path);
  if (req.path === '/admin/login') return next();
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return req;
  }
  try {
    await verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: accessToken is not valid';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(4000, () => {
  console.log('JSON Server auth is running');
});
