const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',     
    user: 'daw',     
    password: '1234',  
    database: 'gestionafct',
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = connection;