import Candidato from '../Modelo/Candidato.js';

//esta classe irá manipular/controlar a entidade Cliente
export default class CandidatoCTRL{

    //método responsável por gravar os dados de um cliente
    //das requisições (POST) vindas da internet por meio do protocolo http
    //recupera os dados de um cliente (JSON) vindos da requisição
    //Vamos combinar que as respostas estão no formato JSON
    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email;
            const dataNascimento = dados.dataNascimento;
            const escolaridade = dados.escolaridade;
            const curso = dados.curso
            if(cpf && nome && endereco && telefone 
               && email && dataNascimento && escolaridade && curso)
            {
                //gravar esse cliente
                const candidato = new Candidato (cpf, nome, endereco,telefone,email, dataNascimento,
                    escolaridade,curso);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                candidato.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um candidato conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    //requisição HTTP do tipo PUT
    atualizar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email;
            const dataNascimento = dados.dataNascimento;
            const escolaridade = dados.escolaridade;
            const curso = dados.curso
            if(cpf && nome && endereco && telefone 
                && email && dataNascimento && escolaridade && curso)
            {
                //gravar esse cliente
                const candidato = new Candidato (cpf, nome, endereco,telefone,email, dataNascimento,
                    escolaridade,curso);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                candidato.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Candidato atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um candidato conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                //gravar esse cliente
                const candidato = new Candidato(cpf);
                //método assíncrono removerDoBanco que instancia a camada de persistência e
                //grava um cliente no banco de dados
                candidato.apagar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Candidato excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe cpf do candidato conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const candidato = new Candidato();
            //método assíncrono que recupera os clientes do banco dados
            candidato.consultar('').then((candidatos)=>{
                    resposta.status(200).json(candidatos);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }

    //alguém poderá fazer a seguinte requisição:
    //GET http://localhost:3000/clientes/111.111.111-11
    consultarPeloCPF(requisicao, resposta){
        resposta.type("application/json");
        
        const cpf = requisicao.params['cpf'];
        
        if(requisicao.method === "GET"){
            const candidato = new Candidato();
            //método assíncrono que recupera os clientes do banco dados
            candidato.consultarCPF(cpf).then((candidato)=>{
                    resposta.status(200).json(candidato);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }
}