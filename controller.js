const {
        login,
        sqlquery, 
        insert, 
        update, 
        del, 
        multidel, 
        duplicate
    } = require('./db/transaction.js');

const { 
        validate, 
    } = require('./hooks/auth.js');

const status = require('./response/status.json');

// ACCEPTS JSON with PROPERTY OF:
// "username" AND "password"
const login_user = (req, res) => {
    const req_username = req.body.username;
    const req_password = req.body.password;
    if(req_username.length > 0 && req_username.length > 0){
        // const req_password = "node!1test";
        // const req_user = "testuser";
        login(req_username)
        .then(body => {
            // console.log(body);
            if(Object.keys(body)[0] === "password"){
                const hash = Object.values(body)[0];
                const isPassValidate = validate(req_password, hash);
                if(isPassValidate === true){
                    req.session.user = req_username;
                    res.send(status.authorized);
                }else{
                    res.send(status.unauthorized_req);
                }
            }else{
                res.send(status.unauthorized_req);
            } 
        })
        .catch(err => {
            // res.send(err);
            res.send(status.server_error);
        })
    }else{
        res.send(status.unauthorized_req);
    }
}

// ACCEPTS JSON with PROPERTY OF:
// "user" AND "auth"
const add_user = (req, res) => {
    const user = req.body.user && req.body.user.split(',');; //["test", "test", "test", "test", "test","test"]
    const auth = req.body.auth; //"testuser"
    duplicate(auth).then(body => {
        if(body.length > 0){
            res.send(status.duplicate);
        }else{
            if(user.length === 6 && auth.length > 0){
                insert(user, auth)
                .then(body => {
                    res.send(status.success_create);
                })
                .catch(err => {
                    // res.send(err);
                    res.send(status.server_error);
                })
            }else{
                res.send(status.unauthorized_req);
            }
        }
    }).catch(err => {
        // res.send(err);
        res.send(status.server_error);
    })
        
    
  
}

// ACCEPTS JSON with PROPERTY OF:
// "user", "auth", "id" 
const edit_user = (req, res) => {
    // let user = {
    //     "first_name": "Juan2"
    // }

    // let auth = {
    //     "username": "Juan2"
    // }
    // let id = 30;
    let user = req.body.user;
    let auth = req.body.auth;
    let id = req.body.id;

    update(user, auth, id)
    .then(body => {
        res.send(status.success_create);
    })
    .catch(err => {
        // res.send(err);
        res.send(status.server_error);
    })

}

// ACCEPTS JSON with PROPERTY OF:
// "id"
const del_user = (req, res) => {
    const id = req.body.id && Number(req.body.id);
    console.log(typeof(id));
    if(id > 0){
        del(id)
        .then(body => {
            res.send(status.success_delete);
        })
        .catch(err => {
            // res.send(err);
            res.send(status.server_error);
        })
    }else{
        res.send(status.unauthorized_req); 
    }
}

const view_user = (req, res) => {
    sqlquery("SELECT * FROM user ORDER BY id DESC")
    .then(body => {
        res.send(body);
    })
    .catch(err => {
        // res.send(err);
        res.send(status.server_error);
    })
}

// ACCEPTS JSON with PROPERTY OF:
// "ids"
const multi_del_user = (req, res) => {
    let ids = req.body.ids && req.body.ids.split(",");
    if(ids.length > 0){
        multidel(ids)
        .then(body => {
            res.send(status.success_delete);
        })
        .catch(err => {
            // res.send(err);
            res.send(status.server_error);
        })
    }else{
        res.send(status.unauthorized_req);
    }
    
}

module.exports = {
    login_user, 
    add_user, 
    edit_user, 
    del_user, 
    view_user, 
    multi_del_user
}