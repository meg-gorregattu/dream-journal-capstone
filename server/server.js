const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

const { getDreams, deleteDream, createDream,login }  = require('./controller');



app.get('/login', (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")))
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, "../public/home.html")))
app.post('/api/login', login)


app.get('/api/dreams/:id', getDreams);
app.delete('/api/dreams/:id', deleteDream);
app.post('/api/dreams', createDream);

app.use((req, res) => res.redirect("/login")) 

const port = process.env.PORT || 4001


app.listen(port, () => {console.log(`dreaming on port ${port}`)})