import { Router } from "express";
import TipoAtividadeCtrl from "../Controle/tipoAtividadeCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const tipoAtividadeCtrl = new TipoAtividadeCtrl();
const rotaTipoAtividade = new Router();

rotaTipoAtividade
.get('/',tipoAtividadeCtrl.consultar)
.get('/:numero', tipoAtividadeCtrl.consultar)
.post('/',tipoAtividadeCtrl.gravar)
.patch('/',tipoAtividadeCtrl.atualizar)
.put('/',tipoAtividadeCtrl.atualizar)
.delete('/',tipoAtividadeCtrl.excluir);

export default rotaTipoAtividade;