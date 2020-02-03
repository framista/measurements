const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const temperatures = require('./routes/temperatures')

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/temperatures', temperatures);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
