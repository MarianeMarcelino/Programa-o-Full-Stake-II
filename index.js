// import express from 'express';
// import cors from 'cors';
// import rotaTurma from './Rotas/rotaTurma.js';
// import rotaAluno from './Rotas/rotaAluno.js';
// import rotaLogin from './Rotas/rotaLogin.js';
// import rotaAtividadeExtracurricular from './Rotas/rotaAtividadeExtracurricular.js';
// import rotaTipoAtvidade from './Rotas/rotaTipoAtividade.js'
// import dotenv from 'dotenv';
// import session from 'express-session';
// // import { verificarAcesso } from './Seguranca/Autenticacao.js';

// const host='0.0.0.0';
// const porta='4000';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(session({
//     secret:process.env.SEGREDO,
//     resave: false,
//     saveUninitialized: true,
//     maxAge: 1000 * 60 * 6
// }));

// app.use('/login',rotaLogin);
// app.use('/tipoAtividade',rotaTipoAtvidade);
// app.use('/turma',/*verificarAcesso,*/rotaTurma);
// app.use('/aluno',/*verificarAcesso,*/rotaAluno);
// app.use('/atividadeExtracurricular',/*verificarAcesso,*/rotaAtividadeExtracurricular);

// app.listen(porta, host, ()=>{
//     console.log(`Servidor escutando na porta ${host}:${porta}.`);
// })

import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import rotaTurma from './Rotas/rotaTurma.js';
import rotaAluno from './Rotas/rotaAluno.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaAtividadeExtracurricular from './Rotas/rotaAtividadeExtracurricular.js';
import rotaTipoAtvidade from './Rotas/rotaTipoAtividade.js';
import dotenv from 'dotenv';
import session from 'express-session';

const host = '0.0.0.0';
const porta = '4000';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}));

// Conexão com o MySQL local
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'sge'
});

connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    } else {
        console.log('Conexão com o MySQL estabelecida com sucesso.');
    }
});

// Middleware para disponibilizar a conexão MySQL para os controladores
app.use((req, res, next) => {
    req.mysql = connection;
    next();
});

app.use('/login', rotaLogin);
app.use('/tipoAtividade', rotaTipoAtvidade);
app.use('/turma', rotaTurma);
app.use('/aluno', rotaAluno);
app.use('/atividadeExtracurricular', rotaAtividadeExtracurricular);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
