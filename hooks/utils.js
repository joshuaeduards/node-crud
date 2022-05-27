const bcrypt = require('bcryptjs')
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const set_update = (data = {}) => {
    let field_name = ""
    let field_vals = []
    // console.log(data);
    Object.entries(data).forEach((entry) => {
        const [key, value] = entry;
        field_name += (`${key}=?,`);
        field_vals.push(value);
    });

    const _field_name = field_name.slice(0, -1) + ' ';
    return  [_field_name, field_vals];
}

const append = (listing, pass="") => {
    // listing.unshift(id)
    listing.push(pass);
    return listing
}

const isJSON = (data) => {
    try{
        JSON.parse(JSON.stringify(data));
        return true;
    }catch(e){
        return false;
    }
}

const set_param = (data = []) => {
    var param = "";
    for( let i = 0; i < data.length;  i++){
        param += ( "?," );
    }
    let new_param = param.slice(0, -1);
    return new_param;
}

const sanitize = (data="") => {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(data);
    return clean
}
const regexify = () => {
    //
}

module.exports = { 
    set_update, 
    append,
    sanitize,
    set_param,
    regexify
}