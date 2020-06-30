const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

//require the files 
 const registerRouter = require('./routes/registration');

 //use the files
app.use('/registration', registerRouter );


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

