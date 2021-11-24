var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./privatekey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getData() {
    return await db.collection('ApplicationForm').get();
}

app.get('/', async function(req, res){
    const data = await getData();
    data.forEach(element => {
        console.log(element.data().studentData);
    });
    res.render('home', { data: data });
 });

app.listen(process.env.PORT || 3000);