import { Router } from "express";
import AlunoCtrl from "../Controle/alunoCtrl.js";

const alunoCtrl = new AlunoCtrl();
const rotaAluno = new Router();

rotaAluno
.get('/', alunoCtrl.consultar)
.get('/:numero', alunoCtrl.consultar)
.post('/', alunoCtrl.gravar)
.patch('/', alunoCtrl.atualizar)
.put('/', alunoCtrl.atualizar)
.delete('/', alunoCtrl.excluir);

export default rotaAluno;