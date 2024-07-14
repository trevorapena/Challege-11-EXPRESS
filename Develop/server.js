const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
app.use (express.json());
app.use(express.static('public'));
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );
  
  app.get('/api/notes', (req, res) =>{
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(JSON.parse(data));
    });
  }
  );

  app.post('/api/notes', (req, res) =>{
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
        const notes = JSON.parse(data); 
        notes.push(req.body);
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.json(req.body);
        });
    });
  }
  );
  // GET Route for feedback page
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );