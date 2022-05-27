const pool = require('../db/connect.js');
const { 
    encrypt,
    decrypt_pass
} = require('../hooks/auth.js');

console.log("Seeding Started");
pool.getConnection(function(err, connection){
    if (err) console.log(err);
    /************* AUTH **************/

    const query = `INSERT INTO auth \
                (username, password)\
                VALUES (?,?)`;

    const admin = "admin";
    const adminpass = decrypt_pass();
    const hash = encrypt(adminpass);
    //pass: 12eqwe
    const val = [
        admin, 
        hash
    ];
    connection.query(query, val, function(err, res){
        if (err) console.log(err);
        console.log("...");
        console.log("success auth insert");
        console.log("...");
        /************* USER **************/

        const lastinsertedID = res.insertId
        const queryuser = `INSERT INTO users \
                    ( auth_id, \
                    first_name, \
                    last_name, \ 
                    address, \
                    postcode, \
                    contact_phone_number, \
                    email ) \
                    VALUES (?,?,?,?,?,?,?)`;

        const valuser = [
                lastinsertedID, 
                "Admin", 
                "Admin", 
                "NCR, PH", 
                "1111", 
                "9876543210", 
                "admin@email.io"
            ];

        connection.query(queryuser, valuser, function(err, res){
            if (err) console.log(err);
            console.log("...");
            console.log("success user insert");
            console.log("...");
            console.log("Done!");
            connection.release();
            process.exit(0)
        })
    })
})
