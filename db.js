require('dotenv').config();

const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@gestion-tareas.m79kqdm.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(
        uri
    )
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log('There was an error with connection!');
        console.log(err);
    });