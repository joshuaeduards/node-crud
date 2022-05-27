


/*********AUTH MIGRATE***********/
exports.down = function (db) {
    return db.dropTable('user');
    };
    
exports.up = function (db) {
    return db.createTable('auth', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      username: { type: 'string', length: 30 },
      password: { type: 'string', length: 150 },
    });
  };
  
/*********USER MIGRATE***********/
exports.down = function (db) {
    return db.dropTable('user');
    };

exports.up = function (db) {
    return db.createTable('pets', {
      id: { type: 'int', length: 6, primaryKey: true, autoIncrement: true },
      auth_id: { type: 'int', length: 6, foreignKey: true },
      first_name: { type: 'string', length: 20 },
      last_name: { type: 'string', length: 20 },
      address: { type: 'text' },
      postcode: { type: 'string', length: 6 },
      contact_phone_number: { type: 'string', length: 10 },
      email: { type: 'string', length: 50 },
    });
  };

exports.up = function (db, callback)
{
  db.addForeignKey('user', 'node-crud', 'auth',
  {
    'auth_id': 'id'
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }, callback);
};

exports.down = function (db, callback)
{
  db.removeForeignKey('user', 'user_id', callback);
};


  
