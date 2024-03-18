const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Messages = require("./models/userMessage");

hbs.registerPartials(__dirname + "/views/partials");


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.render('index');
})

app.post('/data', async (req, res) => {
  const { name, email, message } = req.body;
  // console.log(name,email,message);
  await Messages.create({
    name,
    email,
    message
  });

  res.render('index',{
    msg:"thankyou"
  });
})

app.get('/admin', async(req,res)=>{
  let messages = await Messages.find({});

  res.render('admin', {messages:messages});
})

mongoose.connect('mongodb+srv://priyanshgoyal:vanshpriyansh@cluster0.qts4i4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch(err => {
    console.log("connection error", err);
  });