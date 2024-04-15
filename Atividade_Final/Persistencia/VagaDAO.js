import Vaga from "../Modelo/Vaga.js";
import conectar from "./conexao.js";

export default class VagaDAO {
  async gravar(vaga) {
    if (vaga instanceof Vaga) {
      const sql = `INSERT INTO vaga(cargo,modalidade,
                tipoContrato,salario,empresa,localizacao,cargaHoraria)
                VALUES(?,?,?,?,?,?,?)`;
      const parametros = [
        vaga.cargo,
        vaga.modalidade,
        vaga.tipoContrato,
        vaga.salario,
        vaga.empresa,
        vaga.localizacao,
        vaga.cargaHoraria,
      ];

      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      vaga.codigo = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(vaga) {
    if (vaga instanceof Vaga) {
      const sql = `UPDATE vaga SET cargo = ?, modalidade = ?,
            tipoContrato = ?, salario = ?, empresa = ?, localizacao = ?, cargaHoraria = ?
            WHERE codigo = ?`;
      const parametros = [
        vaga.cargo,
        vaga.modalidade,
        vaga.tipoContrato,
        vaga.salario,
        vaga.empresa,
        vaga.localizacao,
        vaga.cargaHoraria,
        vaga.codigo,
      ];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(vaga) {
    if (vaga instanceof Vaga) {
      const sql = `DELETE FROM vaga WHERE codigo = ?`;
      const parametros = [vaga.codigo];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    if (!termo) {
      termo = "";
    }
    const conexao = await conectar();
    let listaVagas = [];
    if (!isNaN(parseInt(termo))) {
      //consulta pelo código do produto
      const sql = `SELECT v.codigo, v.cargo,
              v.modalidade, v.tipoContrato, v.salario, 
              v.empresa, v.localizacao, v.cargaHoraria
              FROM vaga v 
              WHERE v.codigo = ?
              ORDER BY v.cargo               
            `;
      const parametros = [termo];
      const [registros, campos] = await conexao.execute(sql, parametros);
      for (const registro of registros) {
        const vaga = new Vaga(
          registro.codigo,
          registro.cargo,
          registro.modalidade,
          registro.tipoContrato,
          registro.salario,
          registro.empresa,
          registro.localizacao,
          registro.cargaHoraria
        );
        listaVagas.push(vaga);
      }
    } else {
      //consulta pela descrição da vaga
      const sql = `SELECT v.codigo, v.cargo,
              v.modalidade, v.tipoContrato, v.salario, 
              v.empresa, v.localizacao, v.cargaHoraria
              FROM vaga v 
              WHERE v.cargo like ?
              ORDER BY v.cargo               
            `;
      const parametros = ["%" + termo + "%"];
      const [registros, campos] = await conexao.execute(sql, parametros);
      for (const registro of registros) {
        const vaga = new Vaga(
          registro.codigo,
          registro.cargo,
          registro.modalidade,
          registro.tipoContrato,
          registro.salario,
          registro.empresa,
          registro.localizacao,
          registro.cargaHoraria
        );
        listaVagas.push(vaga);
      }
    }

    return listaVagas;
  }
}
