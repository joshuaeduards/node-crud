module.exports = {
    "up": "CREATE TABLE users (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, auth_id INT(6) UNSIGNED, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, address LONGTEXT NOT NULL, postcode INT(6) NOT NULL, contact_phone_number VARCHAR(10) NOT NULL, email VARCHAR(50) NOT NULL, role VARCHAR(5) NOT NULL, FOREIGN KEY (auth_id) REFERENCES auth(id) ON UPDATE CASCADE ON DELETE CASCADE );", 
    "down": "DROP TABLE users"
}