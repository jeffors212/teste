const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';


function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}


function isAuthenticated({email, password}) {
  const userdb = router.db.get('users').value(); 
  return userdb.findIndex(user => user.email === email && user.password === password) !== -1;
}

// Login endpoint
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const access_token = createToken({email, password});
  res.status(200).json({access_token});
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
