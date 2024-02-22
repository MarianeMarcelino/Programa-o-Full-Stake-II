import Aluno from "../Modelo/aluno.js";

export default class AlunoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { nome, dataNascimento, telefone, email, cpf, turma } = dados;

            if (nome && dataNascimento && telefone && email && cpf && turma) {
                const aluno = new Aluno(0, nome, dataNascimento, telefone, email, cpf, turma);
                aluno.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "raGerado": aluno.ra,
                            "mensagem": "Aluno incluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o aluno: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do aluno devem seguir o formato especificado na documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um aluno!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { aluno_ra, nome, dataNascimento, telefone, email, cpf, turma } = dados;

            // Validando os dados de entrada
            if (aluno_ra && nome && dataNascimento && telefone && email && cpf && turma) {
                const aluno = new Aluno(aluno_ra, nome, dataNascimento, telefone, email, cpf, turma);
                try {
                    await aluno.alterar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o Aluno: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do aluno segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um aluno!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const {aluno_ra } = dados;
            if (aluno_ra ) {
                const aluno = new Aluno(aluno_ra);
                try {
                    await aluno.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o Aluno: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o RA do aluno!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um aluno!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let numero = requisicao.params.numero;
        if (!numero) {
            numero = "";
        }
        if (requisicao.method === "GET") {
            const aluno = new Aluno();
            aluno.consultar(numero)
                .then((listaAlunos) => {
                    resposta.json({
                        status: true,
                        listaAlunos
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Não foi possível obter os Alunos: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar alunos!"
            });
        }
    }
}
