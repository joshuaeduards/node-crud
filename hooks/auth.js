require('dotenv').config();
const bcrypt = require('bcryptjs');
const { eventNames } = require('../db/connect');
const env = process.env;

const encrypt = (pass="") => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);
    return hash
}

const validate = (pass="", hash="") => {
    const isTrue = bcrypt.compareSync(pass, hash);
    return isTrue
}

const decrypt_pass = () => {
    const scrt = env.ADMIN_SCRT;
    let decyph = ""
    for(let i = 0; i < scrt.length; i++){
        if(scrt.length > i+env.ADMIN_SCRT_COUNT){
            decyph += (scrt[i+env.ADMIN_SCRT_COUNT]);
        }
    }
    return decyph
}

module.exports = { 
    encrypt,
    validate,
    decrypt_pass
}