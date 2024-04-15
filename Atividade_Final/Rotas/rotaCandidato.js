import { Router } from "express";
import CandidatoCTRL from "../Controle/CandidatoCtrl.js";

const rotaCandidato = new Router();
const candidatoCTRL = new CandidatoCTRL();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado cliente

rotaCandidato.post('/', candidatoCTRL.gravar)
.put('/',candidatoCTRL.atualizar)
.delete('/',candidatoCTRL.excluir)
.get('/', candidatoCTRL.consultar)
.get('/:cpf', candidatoCTRL.consultarPeloCPF);

export default rotaCandidato;