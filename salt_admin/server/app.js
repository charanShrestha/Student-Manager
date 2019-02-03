const express = require('express');
const svc = require('./app/studentService.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));


mongoose.connect('mongodb://Salt:donkey1@ds117164.mlab.com:17164/salt-admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connection Successful');
});


app.get('/api/students', (_, res) => {
  svc.getAll()
    .then(students => res.send(students));
});

app.get('/api/archived', (_, res) => {
  svc.getArchived()
    .then(students => res.send(students));
});

app.post('/api/students/', (req, res) => {
  svc.create(req.body);
  res.end();
});

app.get('/api/students/:id', (req, res) => {
  svc.findById(req.params.id)
    .then(student => res.send(student));
});

app.delete('/api/students/:id', (req, res) => {
  svc.remove(req.params.id);
  res.send();
});

app.put('/api/students/:id', (req, res) => {
  console.log('putting');
  svc.update(req.params.id, req.body);
  res.end();
});

app.put('/api/students/:id/comments', (req, res) => {
  svc.commenter(req.params.id, req.body);
  res.end();
});

app.put('/api/students/:id/performance', (req, res) => {
  svc.performer(req.params.id, req.body);
  res.end();
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

module.exports = app;
