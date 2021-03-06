const connectdb = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

connectdb();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//? Available Routes 
app.use('/api/auth', require("./routes/auth"))
app.use('/api/blogs', require("./routes/blogs"))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
