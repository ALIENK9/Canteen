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

const SECRET_KEY = 'secret';
const expiresIn = '2h';


// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
async function verifyToken(token) {
  const t = jwt.verify(token, SECRET_KEY);
  console.log(t);
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  console.log(userdb);
  return userdb.users.findIndex(user => user.identifier === username
     && user.password === password) !== -1;
}

// verifica credenziali e invia token todo: fornire Nome Cognome e admin
server.get('/login', (req, res) => {
  const { authorization } = req.headers;
  console.debug(authorization);
  const [/* bearer */, base64Auth] = authorization.split(' '); // token
  const string = Buffer.from(base64Auth, 'base64').toString(); // decode Base64 string
  const [username, password] = string.split(':'); // split username:password
  if (!isAuthenticated({ username, password })) {
    const status = 401;
    console.log('dasasasad');
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ name: username, admin: true });
  console.log('accesstoken cre', accessToken);
  res.status(200).json({ token: accessToken });
});

// verifica token ad ogni richiesta tranne che nella route precedente
/* eslint-disable consistent-return */
server.all('*', async (req, res, next) => {
  console.log('path', req.path);
  if (req.path === '/login') return next();
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    console.log(req.headers.authorization);
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return req;
  }
  try {
    console.log(req.headers.authorization.split(' ')[1], typeof req.headers.authorization.split(' ')[1]);
    await verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    console.log('Catch verify not vaid', err);
    const message = 'Error: accessToken is not valid';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(4000, () => {
  console.log('JSON Server auth is running');
});
