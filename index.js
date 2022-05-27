require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const env = process.env;

const { 
        login_user, 
        add_user, 
        edit_user,
        del_user,
        view_user,
        multi_del_user
    } = require('./controller.js');

const { 
        authenticate
    } = require('./middleware/authentication.js')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: env.APP_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        cookie: true,
        //maxAge: 
        //minute * second * millisecond => 10minutes
        maxAge: 10 * 60 * 1000,
    }
}))

app.post('/login-user', login_user);

app.post('/add-user', add_user);

app.put('/edit-user', edit_user);

app.delete('/del-user', del_user);

app.post('/view-user', authenticate, view_user);

app.delete('/multi-del-user', multi_del_user); 

app.post('/clear', (req, res) => {
    req.session.destroy(null);
    res.send("cleared session!");
}); 
  
app.listen(env.APP_PORT, () => {
  console.log(`Example app listening on port ${env.APP_PORT}`)
})