//camada de interface da API que traduz HTTP
import TipoAtividade from "../Modelo/tipoAtividade.js";

export default class TipoAtividadeCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const descricao = dados.descricao;
            if (nome && serie) {
                const tipoAtividade = new TipoAtividade(0, nome, descricao);
                //resolver a promise
                tipoAtividade.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": tipoAtividade.codigo,
                        "mensagem": "Tipo de Atividade incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar Tipo de Atividade:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do Tipo de Atividade!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um tipo de Atividade!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo; 
            const nome = dados.nome;
            const descricao = dados.descricao;

            if (codigo && nome && descricao) {
                const tipoAtividade = new TipoAtividade(codigo, nome, descricao); 
                tipoAtividade.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de Atividade atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o Tipo de Atividade:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código, nome e descrição do Tipo de Atividade!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um Tipo de Atividade!"
            });
        }
    }
    

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { codigo } = dados; 
            if (codigo) {
                const tipoAtividade = new TipoAtividade(codigo); 
                try {
                    await tipoAtividade.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de Atividade excluída com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir Tipo de Atividade: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do Tipo de Atividade!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um Tipo de Atividade!"
            });
        }
    }
    


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let numero = requisicao.params.numero;
        if (!numero){
            numero = "";
        }
        if (requisicao.method === "GET"){
            const tipoAtividade = new TipoAtividade();
            tipoAtividade.consultar(numero).then((listaTipoAtividades)=>{
                resposta.json(
                    {
                        status:true,
                        listaTipoAtividades
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os Tipos de Atividades: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Tipo de Atividade!"
            });
        }
    }
}