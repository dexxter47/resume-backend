const express = require('express')
const Firestore = require('@google-cloud/firestore');
const app = express()
const port = 8080
const GOOGLE_APPLICATION_CREDENTIALS="/Users/dexter/Development/my-resume-challenge-03a9c98d70ab.json"

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(express.json());

// const db = new Firestore({
//     projectId: 'my-resume-challenge',
//     keyFileName: GOOGLE_APPLICATION_CREDENTIALS
// });

const db = new Firestore();

app.get('/', async (req, res) => {
    const querySnapshot = await db.collection('Visitors').get();
    if (querySnapshot.empty) {
        res.json({status: 'not found'});
      } else {
       const visitor = querySnapshot.docs[0].data();
        res.json(visitor);
      }
  })

  app.post('/update', async (req, res) => {
    const visitor = req.body;
    const docRef = await db.collection('Visitors').doc('visitor').set({
      count: visitor.count
    }, { merge: true });;

    res.json({status: 'success'})

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})