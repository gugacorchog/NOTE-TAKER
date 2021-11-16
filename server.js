const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/notes.js');
const readFromFile = require('./helpers/files')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(clog);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

// GET Route index
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', function(res, res){
 res.sendFile(path.join(__dirname, './public/404.html')),
 res.status(404)
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);