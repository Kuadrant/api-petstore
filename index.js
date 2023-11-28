const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

require('dotenv').config();


const port = 8080;

app.use(express.json());

const file = fs.readFileSync('./openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let pets = [
  { id: 1, name: 'Max', type: 'Dog', status: 'available' },
  { id: 2, name: 'Doggo', type: 'Dog', status: 'available' }
];

app.get('/server/details', function (req, res) {
  const region = process.env.REGION;
  if (region) {
      res.send(`REGION: ${region}`);
  } else {
      res.status(404).send('REGION environment variable not found.');
  }
});

app.get('/api/v3/pet/findByStatus', (req, res) => {
  const status = req.query.status || 'available';
  const filteredPets = pets.filter(p => p.status === status);
  res.status(200).json(filteredPets);
});

app.get('/api/v3/user/login', (req, res) => {
  const { username, password } = req.query;
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: "User logged in successfully" });
  } else {
    res.status(400).json({ message: "Invalid username/password supplied" });
  }
});

app.get('/api/v3/store/inventory', (req, res) => {
  const inventory = {
    available: 10,
    pending: 5,
    sold: 3
  };
  res.status(200).json(inventory);
});


app.listen(port, () => {
  console.log(`Petstore API server listening at http://localhost:${port}`);
  console.log(`Swagger UI Docs: http://localhost:${port}/docs/`);
});

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(1);
});