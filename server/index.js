require("dotenv").config();
const express = require("express");
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const dbName = "formData";
const PORT = 8080;
const url = process.env.MONGODB_URL;
app.use(express.json());

app.post("/newRegistraion", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myobj = req.body;
    dbo.collection("info").insertOne(myobj, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted",result);
        db.close();
        res.status(201).send("Got all the form data");
      });
  });
});

app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);
