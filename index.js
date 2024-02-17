import express from 'express';
import cors from 'cors';
import rotaTurma from './Rotas/rotaTurma.js';
import rotaAluno from './Rotas/rotaAluno.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/turma',rotaTurma);
app.use('/aluno',rotaAluno);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
