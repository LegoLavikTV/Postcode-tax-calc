const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/icon.ico'));
});
app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/main.js'));
});
app.get('/dpl_logo.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/dpl_logo.jpg'));
});
app.get('/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/data.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
