import express from 'express';
import routes from './src/routes/routes.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './src/strategies/local-strategy.js';

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect("mongodb://localhost:27017/todo_app_db")
    .then(() => console.log("connected to the db"))
    .catch(error => console.log(error.message));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))

app.use(routes);

app.listen(port, () => console.log(`server is running on port ${port}`));