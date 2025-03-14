import mysql from 'mysql2';

export const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'apoloBello1295',
  database: 'sis_inventario',
  port: 3307,
});

conexion.connect((error)=>{
    error ? console.log(error) : console.log('Conexión éxitosa')
});
