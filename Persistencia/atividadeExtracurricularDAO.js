
import AtividadeExtracurricular from "../Modelo/atividadeExtracurricular.js";
import TipoAtividade from "../Modelo/tipoAtividade.js";
import Turma from "../Modelo/turma.js";
import Aluno from "../Modelo/aluno.js";
import AlunoAtividade from "../Modelo/atividadeAluno.js";
import conectar from "./conexao.js";

export default class AtividadeExtracurricularDAO{
    async gravar (atividadeExtracurricular){
        if (atividadeExtracurricular instanceof AtividadeExtracurricular)
        {
            const conexao = await conectar();
            
            await conexao.beginTransaction();
            try 
            {

            const sql = 'INSERT INTO atividadeExtracurricular (tipoAtividade_codigo,dia_semana,horario) VALUES (?,?,?)';
            const parametros = [atividadeExtracurricular.tipoAtividade.codigo, atividadeExtracurricular.dia_semana, atividadeExtracurricular.horario];
            
            if (parametros.some(param => param === undefined)) {
                console.log("Um ou mais parâmetros estão undefined na inserção de atividadeExtracurricular:", parametros);
            } 

            else {
                const retorno = await conexao.execute(sql, parametros);
                atividadeExtracurricular.codigo = retorno[0].insertId;
            }

            //inserir na tabela atividade_aluno
            const sql12 = ' INSERT INTO atividade_aluno (aluno_ra,atividadeExtracurricular_codigo,data_inscricao) VALUES (?,?,str_to_date(?,"%d/%m/%Y"))';
            for (const membro of atividadeExtracurricular.membros) {
                let parametros2 = [membro.aluno.ra, atividadeExtracurricular.codigo, membro.data_inscricao];
            
                if (parametros2.some(param => param === undefined)) {
                    console.log("Um ou mais parâmetros estão undefined na inserção de atividade_aluno para o membro:", membro, "Parametros:", parametros2);
                    
                } else {
                    await conexao.execute(sql12, parametros2);
                }
            }
            
            
            await conexao.commit(); 
            }

            catch(error){
                await conexao.rollback(); 
                throw error;
            }

        }

    }
    
    // async consultar(termoBusca) {
    //     const listaAtividadeExtracurricular = [];
    
    //     if (!isNaN(termoBusca)) {
    //         const conexao = await conectar();
    //         const sql = `SELECT ae.codigo, ae.tipoAtividade_codigo, ae.horario, ae.dia_semana,
    //                      ta.codigo,ta.nome, ta.descricao,
    //                      a.aluno_nome, a.aluno_dataNascimento, a.aluno_telefone, a.aluno_email, a.aluno_cpf,
    //                      t.turma_codigo, t.turma_serie,
    //                      aa.aluno_ra, aa.data_inscricao
    //                      FROM atividadeExtracurricular AS ae
    //                      INNER JOIN tipoAtividade AS ta ON ae.tipoAtividade_codigo = ta.codigo
    //                      INNER JOIN atividade_aluno AS aa ON aa.atividadeExtracurricular_codigo = ae.codigo
    //                      INNER JOIN aluno AS a ON a.aluno_ra = aa.aluno_ra
    //                      INNER JOIN turma AS t ON a.turma_codigo = t.turma_codigo
    //                      WHERE ae.codigo = ?`;
    
    //         const [registros] = await conexao.execute(sql, [termoBusca]);
    
    //         // Verificar se algum registro foi encontrado antes de tentar acessá-los
    //         if (registros.length > 0) {
    //             const tipoAtividade = new TipoAtividade(registros[0].codigo, registros[0].nome, registros[0].descricao);
    //             const listaAlunoAtividade = [];
    //             for (const registro of registros) {
    //                 const turma = new Turma(registro.turma_codigo, registro.turma_serie);
    //                 const aluno = new Aluno(registro.aluno_ra, registro.aluno_nome, registro.aluno_dataNascimento, registro.aluno_telefone, registro.aluno_email, registro.aluno_cpf, turma);
    //                 const atividade_aluno = new AlunoAtividade(aluno, registro.data_inscricao);
    //                 listaAlunoAtividade.push(atividade_aluno);
    //             }
    //             const atividadeExtracurricular = new AtividadeExtracurricular(registros[0].codigo, tipoAtividade, registros[0].horario, registros[0].dia_semana, listaAlunoAtividade);
    //             listaAtividadeExtracurricular.push(atividadeExtracurricular);
    //         }
    //     }
    
    //     return listaAtividadeExtracurricular;
    // }

    async consultar(termoBusca) {
    const listaAtividadeExtracurricular = [];
    const conexao = await conectar();
    let sql, parametros;

    if (!isNaN(termoBusca)) {
        // Ajuste esta consulta para buscar os detalhes de uma atividade específica, incluindo membros
        sql = `
            SELECT ae.codigo, ae.dia_semana, ae.horario,
                   ta.codigo AS tipoAtividadeCodigo, ta.nome AS tipoAtividadeNome, ta.descricao AS tipoAtividadeDescricao,
                   aa.aluno_ra, a.aluno_nome, a.aluno_dataNascimento, a.aluno_telefone, a.aluno_email, a.aluno_cpf,
                   aa.data_inscricao
            FROM atividadeExtracurricular ae
            JOIN tipoAtividade ta ON ae.tipoAtividade_codigo = ta.codigo
            LEFT JOIN atividade_aluno aa ON ae.codigo = aa.atividadeExtracurricular_codigo
            LEFT JOIN aluno a ON aa.aluno_ra = a.aluno_ra
            WHERE ae.codigo = ?`;
        parametros = [termoBusca];
    } else {
        // Consulta SQL para buscar todas as atividades incluindo membros
        sql = `
            SELECT ae.codigo, ae.dia_semana, ae.horario,
                   ta.codigo AS tipoAtividadeCodigo, ta.nome AS tipoAtividadeNome, ta.descricao AS tipoAtividadeDescricao,
                   aa.aluno_ra, a.aluno_nome, a.aluno_dataNascimento, a.aluno_telefone, a.aluno_email, a.aluno_cpf,
                   aa.data_inscricao
            FROM atividadeExtracurricular ae
            JOIN tipoAtividade ta ON ae.tipoAtividade_codigo = ta.codigo
            LEFT JOIN atividade_aluno aa ON ae.codigo = aa.atividadeExtracurricular_codigo
            LEFT JOIN aluno a ON aa.aluno_ra = a.aluno_ra`;
        parametros = [];
    }

    try {
        const [registros] = await conexao.execute(sql, parametros);

        // Estrutura para mapear cada atividade a seus membros
        const atividadeMap = {};

        for (const registro of registros) {
            // Se a atividade ainda não foi adicionada ao mapa, inicialize-a com os detalhes básicos e um array vazio para membros
            if (!atividadeMap[registro.codigo]) {
                atividadeMap[registro.codigo] = {
                    codigo: registro.codigo,
                    dia_semana: registro.dia_semana,
                    horario: registro.horario,
                    tipoAtividade: {
                        codigo: registro.tipoAtividadeCodigo,
                        nome: registro.tipoAtividadeNome,
                        descricao: registro.tipoAtividadeDescricao
                    },
                    membros: []
                };
            }

            // Se há informações de um membro, adicione-o ao array de membros da atividade
            if (registro.aluno_ra) {
                atividadeMap[registro.codigo].membros.push({
                    ra: registro.aluno_ra,
                    nome: registro.aluno_nome,
                    dataNascimento: registro.aluno_dataNascimento,
                    telefone: registro.aluno_telefone,
                    email: registro.aluno_email,
                    cpf: registro.aluno_cpf,
                    data_inscricao: registro.data_inscricao
                });
            }
        }

        // Adicione todas as atividades do mapa à lista de resposta
        for (const atividade of Object.values(atividadeMap)) {
            listaAtividadeExtracurricular.push(atividade);
        }

        return listaAtividadeExtracurricular;
    } catch (error) {
        console.error("Erro na consulta de atividades extracurriculares:", error);
        throw error;
    }
}

    
    

    async atualizar(atividadeExtracurricular) {
        if (atividadeExtracurricular instanceof AtividadeExtracurricular) {
            const conexao = await conectar();
    
            await conexao.beginTransaction();
            try {
                // Atualizar os dados da atividade extracurricular
                const sqlAtualizacao = 'UPDATE atividadeExtracurricular SET tipoAtividade_codigo = ?, dia_semana = ?, horario = ? WHERE codigo = ?';
                const parametrosAtualizacao = [atividadeExtracurricular.tipoAtividade.codigo, atividadeExtracurricular.dia_semana, atividadeExtracurricular.horario, atividadeExtracurricular.codigo];
                await conexao.execute(sqlAtualizacao, parametrosAtualizacao);
    
                // Remover os membros antigos relacionados a esta atividade
                const sqlRemocao = 'DELETE FROM atividade_aluno WHERE atividadeExtracurricular_codigo = ?';
                const parametrosRemocao = [atividadeExtracurricular.codigo];
                await conexao.execute(sqlRemocao, parametrosRemocao);
    
                // Inserir os novos membros relacionados a esta atividade
                const sqlInsercao = 'INSERT INTO atividade_aluno (aluno_ra, atividadeExtracurricular_codigo, data_inscricao) VALUES (?, ?, str_to_date(?, "%d/%m/%Y"))';
                for (const membro of atividadeExtracurricular.membros) {
                    const parametrosInsercao = [membro.aluno.ra, atividadeExtracurricular.codigo, membro.data_inscricao];
                    await conexao.execute(sqlInsercao, parametrosInsercao);
                }
    
                // Commit da transação após a execução bem-sucedida das operações
                await conexao.commit();
    
                return true; // Indica que a atualização foi bem-sucedida
            } catch (error) {
                // Rollback da transação em caso de erro
                await conexao.rollback();
                throw error; // Lança o erro para que seja tratado externamente
            }
        } else {
            throw new Error('Objeto não é uma instância de AtividadeExtracurricular');
        }
    }
    
    async deletar(codigo) {
        const conexao = await conectar();
        await conexao.beginTransaction();
        try {
            // Primeiro, remova as associações na tabela atividade_aluno
            const sqlDeletarAssociacoes = 'DELETE FROM atividade_aluno WHERE atividadeExtracurricular_codigo = ?';
            await conexao.execute(sqlDeletarAssociacoes, [codigo]);
    
            // Depois, remova a própria atividade extracurricular
            const sqlDeletarAtividade = 'DELETE FROM atividadeExtracurricular WHERE codigo = ?';
            await conexao.execute(sqlDeletarAtividade, [codigo]);
    
            await conexao.commit();
        } catch (error) {
            await conexao.rollback();
            throw error;
        }
    }
    
}    