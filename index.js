const couchbase = require('couchbase');
const express = require('express');

const app = express();
const port = 3000; // TODO: add env vars


const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password" // FIXME: should not be hard coded
});

const bucket = cluster.bucket("travel-sample");

const collection = bucket.defaultCollection();


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/airlines', async (req, res) => {
  let qs;
  if (true) { // use this to check input formats
    qs = `SELECT * from \`travel-sample\` WHERE type="airline" LIMIT 5;`
  }

  let result, rows;
  try {
    result = await cluster.query(qs);
    rows = result.rows;
  } catch (e) {
    console.log(e);
    res.send(400);
    return;
  }

  res.send({
    data: rows,
    context: [qs]
  });
});

app.get('/airlines/:key', async (req, res) => {
  getAirlineByKey(req.params['key']).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log("Error fetching airline by key");
    res.send(400);
    return;
  });
});


// Helper/Test functions and definitions TODO: move these to a db file
const airline = {
  type: "airline",
  id: 216,
  callsign: "PKT",
  iata: null,
  iaco: null,
  name: "United Airlines"
};

const upsertDocument = async (doc) => {
  try {
    const key = `${doc.type}_${doc.id}`;
    const result = await collection.upsert(key, doc);
    console.log("Upsert Result: ");
    console.log(result);
  } catch (error) {
    console.log("Upsert Error: ");
    console.log(error);
  }
};

const getAirlineByKey = async (key) => {
  try {
    const result = await collection.get(key);
    return result;
  } catch (error) {
    console.log("Get Error: ");
    console.log(error);
  }
};




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
