import Turma from "../Modelo/turma.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class TurmaDAO{
    async gravar(turma){
        if (turma instanceof Turma){
            const sql = "INSERT INTO turma(turma_serie) VALUES(?)"; 
            const parametros = [turma.serie];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            turma.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(turma){
        if (turma instanceof Turma){
            const sql = "UPDATE turma SET turma_serie = ? WHERE turma_codigo = ?"; 
            const parametros = [turma.serie, turma.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(turma){
        if (turma instanceof Turma){
            const sql = "DELETE FROM turma WHERE turma_codigo = ?"; 
            const parametros = [turma.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da turma
            sql='SELECT * FROM turma WHERE turma_codigo = ? order by turma_serie';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela série
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM turma WHERE turma_serie like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaTurmas = [];
        for (const registro of registros){
            const turma = new Turma(registro.turma_codigo,registro.turma_serie);
            listaTurmas.push(turma);
        }
        return listaTurmas;
    }
}