const status = require('../response/status.json');
const env = process.env;

const authenticate = (req, res, next) => {
    if(req.session.user != undefined){
        // if(req.session.role === 'admin'){
            next();
        // }else{
        //     res.send(status.unauthorized);
        // }
    }else{
        res.send(status.unauthorized);
    }
}

module.exports = {
    authenticate
}