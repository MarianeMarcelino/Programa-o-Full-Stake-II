import TipoAtividade from "../Modelo/tipoAtividade.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class TipoAtividadeDAO{
    async gravar(tipoAtividade){
        if (tipoAtividade instanceof TipoAtividade){
            const sql = "INSERT INTO tipoAtividade (nome, descricao) VALUES(?,?)"; 
            const parametros = [tipoAtividade.nome, tipoAtividade.descricao,tipoAtividade.atividadeExtracurricular.codigo];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            tipoAtividade.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(tipoAtividade){
        if (tipoAtividade instanceof TipoAtividade){
            const sql = "UPDATE tipoAtividade SET nome = ?, descricao = ? WHERE codigo = ?"; 
            const parametros = [tipoAtividade.nome, tipoAtividade.descricao, tipoAtividade.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(tipoAtividade){
        if (tipoAtividade instanceof TipoAtividade){
            const sql = "DELETE FROM tipoAtividade WHERE codigo = ?"; 
            const parametros = [tipoAtividade.codigo];
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
            //consultar pelo código 
            sql='SELECT * FROM tipoAtividade WHERE codigo = ? order by nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela nome
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM tipoAtividade WHERE nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaTipoAtividades = [];
        for (const registro of registros){
            const tipoAtividade = new TipoAtividade(registro.codigo,registro.nome, registro.descricao);
            listaTipoAtividades.push(tipoAtividade);
        }
        return listaTipoAtividades;
    }
}
