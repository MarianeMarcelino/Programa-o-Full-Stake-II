import { Router } from "express";
import AtividadeExtracurricularCtrl from "../Controle/atividadeExtracurricularCtrl.js";

const rotaAtividadeExtracurricular = new Router();
const atividadeExtracurricularCtrl = new AtividadeExtracurricularCtrl();

rotaAtividadeExtracurricular
    // .get('/:termo', atividadeExtracurricularCtrl.consultar)
    rotaAtividadeExtracurricular.get('/:termo?', atividadeExtracurricularCtrl.consultar)
    .post('/', atividadeExtracurricularCtrl.gravar)
    .put('/:codigo', atividadeExtracurricularCtrl.atualizar)
    .delete('/:codigo', atividadeExtracurricularCtrl.excluir);


export default rotaAtividadeExtracurricular;
