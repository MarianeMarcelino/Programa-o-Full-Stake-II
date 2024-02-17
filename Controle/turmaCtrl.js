//camada de interface da API que traduz HTTP
import Turma from "../Modelo/turma.js";

export default class TurmaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const serie = dados.serie;
            if (serie) {
                const turma = new Turma(0, serie);
                //resolver a promise
                turma.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": turma.codigo,
                        "mensagem": "Turma incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a turma:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a série da turma!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma turma!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const serie = dados.serie;
            if (codigo && serie) {
                const turma = new Turma(codigo, serie);
                //resolver a promise
                categoria.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Turma atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a Turma:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a série da Turma!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma turma!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const turma = new Turma(codigo);
                //resolver a promise
                categoria.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Turma excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a Turma:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da Turma!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma turma!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let numero = requisicao.params.numero;
        if (!numero){
            numero = "";
        }
        if (requisicao.method === "GET"){
            const turma = new Turma();
            turma.consultar(numero).then((listaTurmas)=>{
                resposta.json(
                    {
                        status:true,
                        listaTurmas
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as turmas: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar turmas!"
            });
        }
    }
}