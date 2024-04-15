
import TipoAtividade from "../Modelo/tipoAtividade.js";
import AtividadeExtracurricular from "../Modelo/atividadeExtracurricular.js";
import AtividadeExtracurricularDAO from "../Persistencia/AtividadeExtracurricularDAO.js";
import Aluno from "../Modelo/aluno.js";
import AlunoAtividade from "../Modelo/atividadeAluno.js";

export default class atividadeExtracurricularCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const tipoAtividade = new TipoAtividade(dados.tipoAtividade.codigo);
            const horario = dados.horario;
            const dia_semana = dados.dia_semana;
            const membrosAtividade = dados.membros;

            let membros = [];
            for (const membro of membrosAtividade) {
                const aluno = new Aluno(membro.ra); 
                const objMembro = new AlunoAtividade(aluno, membro.data_inscricao);
                membros.push(objMembro);
            }

            const atividadeExtracurricular = new AtividadeExtracurricular(0, tipoAtividade, horario, dia_semana, membros);
            const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
            atividadeExtracurricularDAO.gravar(atividadeExtracurricular).then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Atividade registrada com sucesso!",
                    
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o pedido: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida!"
            });
        }
    }

    // consultar (requisicao,resposta){
    //     resposta.type ('application/json');
    //     if (requisicao.method === 'GET'){
    //         let termo = requisicao.params.termo;
    //         if (!isNaN (termo)){
    //             const atividadeExtracurricular = new AtividadeExtracurricular (0);
    //             atividadeExtracurricular.consultar(termo).then((listaAtividadeExtracurricular)=>{
    //                 resposta.status(200).json({
    //                     "status":true,
    //                     "listaAtividadeExtracurricular":listaAtividadeExtracurricular
    //                 })

    //             })

    //             .catch((erro)=>{
    //                 resposta.status(500).json({
    //                     "status": false,
    //                     "mensagem": "Erro ao consultar a Atividade Extracurricular" + erro.mensage
    //                 });
    //             })
    //         }

    //         else{
    //             resposta.status(400).json({
    //                 "status":false,
    //                 "mensagem": "Requisição Inválida!"
    //             })
    //         }

    //     }
    // }  

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        const termo = requisicao.params.termo; // 'termo' pode ser undefined se não for passado
    
        const atividadeExtracurricular = new AtividadeExtracurricular(0);
        atividadeExtracurricular.consultar(termo).then((listaAtividadeExtracurricular) => {
            resposta.status(200).json({
                "status": true,
                "listaAtividadeExtracurricular": listaAtividadeExtracurricular
            });
        }).catch((erro) => {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao consultar a Atividade Extracurricular: " + erro.message
            });
        });
    }
    

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            // Supondo que 'codigo' é passado para identificar a atividade a ser atualizada
            const atividadeExtracurricular = new AtividadeExtracurricular(dados.codigo, new TipoAtividade(dados.tipoAtividade.codigo), dados.horario, dados.dia_semana, dados.membros);
    
            const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
            try {
                await atividadeExtracurricularDAO.atualizar(atividadeExtracurricular);
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Atividade extracurricular atualizada com sucesso!"
                });
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao atualizar a atividade extracurricular: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            try {
                const codigo = requisicao.params.codigo; // Captura o código da URL
                const { dia_semana, horario, tipoAtividade, membros } = requisicao.body;
    
                // Criar instâncias para os membros
                const membrosInstancias = membros.map(membro => new AlunoAtividade(new Aluno(membro.ra), membro.data_inscricao));
                
                // Criar instância de AtividadeExtracurricular
                const atividade = new AtividadeExtracurricular(codigo, new TipoAtividade(tipoAtividade.codigo), horario, dia_semana, membrosInstancias);
    
                // DAO para atualizar
                await new AtividadeExtracurricularDAO().atualizar(atividade);
                
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Atividade atualizada com sucesso!"
                });
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao atualizar a atividade: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida!"
            });
        }
    }
    

    async excluir(requisicao, resposta) {
        // Implementação do método de exclusão
        resposta.type('application/json');
        if (requisicao.method === 'DELETE') {
            const codigo = requisicao.params.codigo;

            try {
                const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
                await atividadeExtracurricularDAO.deletar(codigo);
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Atividade excluída com sucesso!",
                });
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao excluir a atividade: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida!"
            });
        }
    }
}