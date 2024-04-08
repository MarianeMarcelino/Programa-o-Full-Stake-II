import { Router } from "express";
import TurmaCtrl from "../Controle/turmaCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const turmaCtrl = new TurmaCtrl();
const rotaTurma = new Router();

rotaTurma
.get('/',turmaCtrl.consultar)
.get('/:numero', turmaCtrl.consultar)
.post('/',turmaCtrl.gravar)
.patch('/',turmaCtrl.atualizar)
.put('/',turmaCtrl.atualizar)
.delete('/',turmaCtrl.excluir);

export default rotaTurma;