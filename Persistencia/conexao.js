// import mysql from 'mysql2/promise';

// export default async function conectar(){
//     if (global.poolConexoes){
//         return await global.poolConexoes.getConnection();
//     }
//     else{
//         const pool = mysql.createPool({
//             host: '129.146.68.51',
//             user: process.env.USUARIO_BD,
//             password:process.env.SENHA_BD,
//             database: 'BackendAluno21',
//             waitForConnections: true,
//             connectionLimit: 10,
//             maxIdle: 10, 
//             idleTimeout: 60000,
//             queueLimit: 0,
//             enableKeepAlive: true,
//             keepAliveInitialDelay: 0
//           });

//           global.poolConexoes = pool;
//           return await pool.getConnection();
//     }
// }

import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost', // Altere para o endereço do seu banco de dados local
            user: 'root', // Altere para o usuário do seu banco de dados local
            password: '', // Altere para a senha do seu banco de dados local
            database: 'sge', // Altere para o nome do seu banco de dados local
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        global.poolConexoes = pool;
        return await pool.getConnection();
    }
}
