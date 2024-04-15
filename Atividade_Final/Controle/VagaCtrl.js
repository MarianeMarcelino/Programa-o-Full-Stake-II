import Vaga from "../Modelo/Vaga.js";

export default class VagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cargo = dados.cargo;
            const modalidade = dados.modalidade;
            const tipoContrato= dados.tipoContrato;
            const salario = dados.salario;
            const empresa = dados.empresa;
            const localizacao = dados.localizacao;
            const cargaHoraria = dados.cargaHoraria;

            if (cargo && modalidade && tipoContrato && salario
                && empresa && localizacao && cargaHoraria) {
                const vaga = new Vaga(0, cargo, modalidade,
                    tipoContrato, salario, empresa, localizacao, cargaHoraria
                );
                //resolver a promise
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": vaga.codigo,
                        "mensagem": "Vaga incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados da vaga segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cargo = dados.cargo;
            const modalidade = dados.modalidade;
            const tipoContrato= dados.tipoContrato;
            const salario = dados.salario;
            const empresa = dados.empresa;
            const localizacao = dados.localizacao;
            const cargaHoraria = dados.cargaHoraria;
            if (codigo && cargo && modalidade && tipoContrato && salario
                && empresa && localizacao && cargaHoraria) {
                const vaga = new Vaga(codigo, cargo, modalidade,
                    tipoContrato, salario, empresa, localizacao, cargaHoraria);
                //resolver a promise
                vaga.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da vaga segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma vaga!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const codigo = requisicao.body.codigo;
    
            if (codigo) {
                const vaga = new Vaga(codigo);
                vaga.apagar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a vaga:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Código da vaga é necessário para a exclusão!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Método DELETE esperado com JSON válido!"
            });
        }
    }
    


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const vaga = new Vaga();
            vaga.consultar(termo).then((listaVagas) => {
                resposta.json(
                    {
                        status: true,
                        listaVagas
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as Vagas: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar as vagas!"
            });
        }
    }
}