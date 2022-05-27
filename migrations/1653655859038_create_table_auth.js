module.exports = {
    "up": "CREATE TABLE auth ( \
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        username VARCHAR(30) NOT NULL,\
        password VARCHAR(150) NOT NULL);",
    "down": "DROP TABLE auth;"
}