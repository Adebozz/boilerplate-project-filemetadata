const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML file
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer to store uploads in 'uploads/' directory
const upload = multer({ dest: 'uploads/' });

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
