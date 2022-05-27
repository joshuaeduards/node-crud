const env = process.env;

const { 
        set_update, 
        append,
        sanitize,
        set_param
    } = require('../hooks/utils.js');

const { 
        encrypt
    } = require('../hooks/auth.js');

const pool = require('./connect.js');

const login = (auth="") => {
    return  new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                const query = `SELECT \
                password \
                FROM auth \
                WHERE username=?`;
                // console.log(auth);
                connection.query(query, sanitize(auth), function(err, res){
                    if (err){
                        reject(err);
                    }else{
                        if(res.length > 0){
                            resolve(res[0]);
                        }else{
                            resolve(res);
                        }
                        connection.release();
                    }
                })
            }
        })
    })
}

const sqlquery = (query="", val=[]) => {
    return  new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                connection.query(sanitize(query), val, function(err, res){
                    if (err){
                        reject(err);
                    }
                    resolve(res);
                    connection.release();
                })
            }
        })
    })
}

const insert = (userval=[], authval="") => {
    return  new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                const pass = env.APP_DEFAULT_PASS_EXT+userval[0];
                // console.log(pass);
                const hash = encrypt(pass)
                const auth = [ authval, hash ];
                
                const authquery = `INSERT INTO auth \
                        (username, password)\
                        VALUES (?,?)`
               
                connection.query(authquery, auth, function(err, res){
                    if (err){
                        reject(err);
                    }else{
                        const lastinsertedID = res.insertId
                        userval.unshift(lastinsertedID)
                        const userquery = `INSERT INTO  users  \
                        (auth_id, first_name, last_name, address, postcode, contact_phone_number, email)\
                        VALUES (?,?,?,?,?,?,?)`;
        
                        connection.query(userquery, userval, function(err, res){
                            if (err) {
                                reject(err)
                                connection.release();
                            }else{
                                resolve(res)
                                connection.release();
                            }
                        })
                    }
                })
            }
        })
    })

}

const update = (user = {}, auth = {}, id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                const [authfield, authval] = set_update(auth);
                authval.push(id);
                const authquery = `UPDATE auth SET\
                ${authfield}\
                WHERE id=?`;

                connection.query(authquery, authval, function(err, res){
                    if (err) {
                        reject(err)
                    }else{
                        const [userfield, userval] = set_update(user);
                        userval.push(id);
                        const userquery = `UPDATE  users  SET\
                        ${userfield}
                        WHERE auth_id=?`;

                        connection.query(userquery, userval, function(err, res){
                            if (err) {
                                reject(err)
                                connection.release();
                            }else{
                                resolve(res)
                                connection.release();
                            }
                        })
                    }
                })
            }
    })
})
}

//CASCADE USER DATA
const del = (id="") => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                const query = `DELETE FROM auth WHERE id = ?`
                let str_id = String(id);
                connection.query(query, str_id, function(err, res){
                    if (err) {
                        reject(err)
                        connection.release();
                    }else{
                        resolve(res)
                        connection.release();
                    }
                })
            }
        })
    })
}

//CASCADE USER DATA
const multidel = (ids=[]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                let param = set_param(ids);
                const query = `DELETE FROM auth WHERE id IN (${param})`
                // console.log(query);
                connection.query(query, ids, function(err, res){
                    if (err) {
                        reject(err)
                        connection.release();
                    }else{
                        resolve(res)
                        connection.release();
                    }
                })
            }
        })
    })
}

const duplicate = (user="") => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if (err){
                console.log(err);
                reject(err);
            }else{
                const query = `SELECT * FROM auth WHERE username = ?`
                // console.log(query);
                connection.query(query, user, function(err, res){
                    if (err) {
                        reject(err)
                        connection.release();
                    }else{
                        resolve(res)
                        connection.release();
                    }
                })
            }
        })
    })
}

module.exports = { 
    login,
    sqlquery, 
    insert, 
    update,
    del, 
    multidel,
    duplicate
};
