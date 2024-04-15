import Candidato from "../Modelo/Candidato.js";
import conectar from "./conexao.js";

export default class CandidatoDAO {
  async incluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO candidato (cpf,nome,endereco,telefone,email,dataNascimento,escolaridade,curso) \
                                           VALUES(?,?,?,?,?,?,?,?)";
      const valores = [
        candidato.cpf,
        candidato.nome,
        candidato.endereco,
        candidato.telefone,
        candidato.email,
        candidato.dataNascimento,
        candidato.escolaridade,
        candidato.curso,
      ];
      await conexao.query(sql, valores);
    }
  }

  async alterar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql =
        "UPDATE candidato SET nome=?, endereco = ?,telefone = ?, email =?, dataNascimento = ?,escolaridade = ?,curso = ? \
            WHERE cpf=?";
      const valores = [
        candidato.nome,
        candidato.endereco,
        candidato.telefone,
        candidato.email,
        candidato.dataNascimento,
        candidato.escolaridade,
        candidato.curso,
        candidato.cpf,
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = "DELETE FROM candidato WHERE cpf=?";
      const valores = [candidato.cpf];
      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM candidato WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaCandidatos = [];
    for (const row of rows) {
        const candidato = new Candidato(
            row["cpf"],
            row["nome"],
            row["endereco"],
            row["telefone"],
            row["email"],
            row["dataNascimento"],
            row["escolaridade"],
            row["curso"]
        );
        listaCandidatos.push(candidato);
    }
    return listaCandidatos;
}


  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM candidato WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaCandidatos = [];
    for (const row of rows) {
      const candidato = new Candidato(
        row["cpf"],
        row["nome"],
        row["endereco"],
        row["telefone"],
        row["email"],
        row["dataNascimento"],
        row["escolaridade"],
        row["curso"]
      );
      listaCandidatos.push(candidato);
    }
    return listaCandidatos;
  }
}
