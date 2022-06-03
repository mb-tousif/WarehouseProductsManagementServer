const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken"); // import jwt if use JsonWeb token
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();

// used Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER_PASSWORD}@ecommerce.gnmzc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,});

async function run() {
  try {
    await client.connect();
    // Database Collections
    const productsCollection = client.db("Ecommerce").collection("products");

    app.get("/products", async (req, res) => {
      const query = {};
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // pagination API 
    app.get('/productCount', async (req, res)=>{
      const query = {};
      const cursor = productsCollection.find(query)
      const count = await cursor.count();
      res.send({count})
    })

  } finally {
    // await client.close();
  }
}

  // Call the function you declared above
  run().catch(console.dir);

  // Root Api to check activity
  app.get("/", (req, res) => {
    res.send("Hello from server!");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });