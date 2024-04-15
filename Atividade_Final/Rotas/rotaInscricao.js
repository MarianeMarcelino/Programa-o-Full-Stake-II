// import { Router } from "express";
// import InscricaoCtrl from "../Controle/InscricaoCtrl.js";

// const rotaInscricao = new Router();
// const inscricaoCtrl = new InscricaoCtrl();

// rotaInscricao
// .get('/inscricao', inscricaoCtrl.consultar)
// .post('/', inscricaoCtrl.gravar);
// //.patch('/', pedidoCtrl.atualizar)
// //.put('/', pedidoCtrl.atualizar)
// //.delete('/', pedidoCtrl.excluir);

// export default rotaInscricao;

import { Router } from "express";
import InscricaoCtrl from "../Controle/InscricaoCtrl.js";

const rotaInscricao = new Router();
const inscricaoCtrl = new InscricaoCtrl();

rotaInscricao
    .post('/', inscricaoCtrl.gravar)
    .get('/', inscricaoCtrl.consultar);  // Rota para consulta

export default rotaInscricao;
