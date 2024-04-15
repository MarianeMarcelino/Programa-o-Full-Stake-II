import express from 'express';
import cors from 'cors';
import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import rotaInscricao from './Rotas/rotaInscricao.js';

const host='0.0.0.0';
const porta='4000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/candidato',rotaCandidato);
app.use('/vaga',rotaVaga);
app.use('/inscricao',rotaInscricao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
