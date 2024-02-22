import Aluno from '../Modelo/aluno.js';
import Turma from '../Modelo/turma.js';
import conectar from './conexao.js';

export default class AlunoDAO {

    async gravar(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `INSERT INTO aluno(aluno_nome, aluno_dataNascimento,
                aluno_telefone, aluno_email, aluno_cpf,turma_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [aluno.nome, aluno.dataNascimento, aluno.telefone,
            aluno.email, aluno.cpf,aluno.turma.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            aluno.ra = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `UPDATE aluno SET aluno_nome = ?, aluno_dataNascimento = ?,
            aluno_telefone = ?, aluno_email = ?, aluno_cpf = ?, turma_codigo = ?
            WHERE aluno_ra = ?`;
            const parametros = [aluno.nome, aluno.dataNascimento, aluno.telefone,
            aluno.email, aluno.cpf, aluno.turma.codigo,aluno.ra];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `DELETE FROM aluno WHERE aluno_ra = ?`;
            const parametros = [aluno.ra];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(numero) {
        if (!numero){
            numero="";
        }

        const conexao = await conectar();
        let listaAlunos = [];
        if (!isNaN(parseInt(numero))){
            //consulta pelo RA do aluno
            const sql = `SELECT a.aluno_ra, a.aluno_nome,
              a.aluno_dataNascimento, a.aluno_telefone, a.aluno_email, 
              a.aluno_cpf,t.turma_codigo,t.turma_serie
              FROM aluno a 
              INNER JOIN turma t ON a.turma_codigo = t.turma_codigo
              WHERE a.aluno_ra = ?
              ORDER BY a.aluno_nome               
            `;
            const parametros=[numero];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const turma =  new Turma(registro.turma_codigo,registro.turma_serie);
                const aluno = new Aluno(registro.aluno_ra,registro.aluno_nome,
                                            registro.aluno_dataNascimento,registro.aluno_telefone,
                                            registro.aluno_email, registro.aluno_cpf,turma
                                            );
                listaAlunos.push(aluno);
            }
        }
        else
        {
            //consulta pela nome do Aluno
            const sql = `SELECT a.aluno_ra, a.aluno_nome,
              a.aluno_dataNascimento, a.aluno_telefone, a.aluno_email, 
              a.aluno_cpf,t.turma_codigo,t.turma_serie
              FROM aluno a 
              INNER JOIN turma t ON a.turma_codigo = t.turma_codigo
              WHERE a.aluno_nome like ?
              ORDER BY a.aluno_nome               
            `;
            const parametros=['%'+numero+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const turma =  new Turma(registro.turma_codigo,registro.turma_serie);
                const aluno = new Aluno(registro.aluno_ra,registro.aluno_nome,
                                            registro.aluno_dataNascimento,registro.aluno_telefone,
                                            registro.aluno_email, registro.aluno_cpf,turma
                                            );
                listaAlunos.push(aluno);
            }
        }

        return listaAlunos;
    }
}