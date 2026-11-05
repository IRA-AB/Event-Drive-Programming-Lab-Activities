var express = require('express');
var app = express();
app.use(express.json());
var PORT_NUMBER = 5000;

app.get('/', function (req, res) {
    res.json({ message: "Here in document root" });
});

app.get('/users', function (req, res) {
  res.json({ message: "Here in get users" });
});

app.post('/users', function (req, res) {
  res.json({ message: "Here in insert user" });
});

app.patch('/users', function (req, res) {
  res.json({ message: "Here in update user" });
});

app.delete('/users', function (req, res) {
  res.json({ message: "Here in delete users" });
});

app.listen(PORT_NUMBER, function () {
  console.log("Yay the server started on port " + PORT_NUMBER);
});