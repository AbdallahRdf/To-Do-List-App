import express from 'express';
import routes from './src/routes/routes.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import './src/strategies/local-strategy.js';

const port = process.env.PORT || 5000;

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

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
}));

// routes
app.use(routes);

app.listen(port, () => console.log(`server is running on port ${port}`));