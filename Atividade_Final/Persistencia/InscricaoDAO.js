import Candidato from "../Modelo/Candidato.js";
import Vaga from "../Modelo/Vaga.js";
import Inscricao from "../Modelo/Inscricao.js";
import conectar from "./conexao.js";

export default class InscricaoDAO {
  //   async gravar(inscricao) {
  //     //um pedido no banco de dados grava registro na tabela pedido e também na tabela pedido_produto
  //     if (inscricao instanceof Inscricao) {
  //       const conexao = await conectar();
  //       //garantir a transação das operações para que seja realizada de forma atômica
  //       await conexao.beginTransaction();
  //       try {
  //         //inserir na tabela pedido
  //         const sql =
  //           "INSERT INTO vaga (candidato_cpf, dataInscricao, horarioInscricao,vaga_codigo) VALUES(?,?,?,?,?)";
  //         const parametros = [
  //           inscricao.candidato.cpf,
  //           inscricao.dataInscricao,
  //           inscricao.horarioInscricao,
  //           inscricao.vaga_codigo,
  //         ];
  //         const retorno = await conexao.execute(sql, parametros);
  //         // pedido.codigo = retorno[0].insertId;
  //         //inserir na tabela item pedido
  //         // const sql2 = 'INSERT INTO vagas (pedido_codigo, produto_codigo, quantidade, preco_unitario) VALUES(?,?,?,?)';
  //         // for (const item of pedido.itens) {
  //         //     let parametros2 = [pedido.codigo, item.produto.codigo, item.quantidade, item.precoUnitario];
  //         //     await conexao.execute(sql2, parametros2);
  //         // }
  //         await conexao.commit(); //se chegou até aqui sem erros, confirmaremos as inclusões
  //       } catch (error) {
  //         await conexao.rollback(); //voltar o banco de dados ao estado anterior
  //         throw error; //throw = lançar
  //       }
  //     }
  //   }

  async gravar(inscricao) {
    const conexao = await conectar();
    await conexao.beginTransaction();
    try {
        // Certifique-se que a instrução SQL está correta
        const sql = "INSERT INTO inscricao (candidato_cpf, vaga_codigo, dataInscricao, horarioInscricao) VALUES (?, ?, ?, ?)";
        // Cada vaga da inscrição deve ser inserida
        for (const vaga of inscricao.vagas) {
            const parametros = [
                inscricao.candidato_cpf,
                vaga.codigo,  // Assegure-se que vaga.codigo é o correto e que 'Vaga' é construída com 'codigo'
                inscricao.dataInscricao,
                inscricao.horarioInscricao,
            ];
            await conexao.execute(sql, parametros);
        }
        await conexao.commit();  // Confirma as inclusões se não houve erros
    } catch (error) {
        await conexao.rollback();  // Reverte as mudanças em caso de erro
        throw error;  // Lança o erro para ser tratado em outra parte
    }
}


//   async consultar(termoBusca) {
//     const listaInscricoes = [];
//     if (!isNaN(termoBusca)) {
//       //assegurando que seja um código de pedido do tipo inteiro
//       const conexao = await conectar();
//       const sql = `SELECT i.vaga_codigo, i.candidato_cpf, i.dataInscricao, i.horarioInscricao,
//             c.cpf, c.nome, c.endereco, c.telefone, c.email, c.dataNascimento, c.escolaridade, 
//             c.curso,
//             v.codigo, v.cargo, v.modalidade, v.tipoContrato, v.salario, v.empresa, v.localizacao,
//             v.cargaHoraria
//             FROM inscricao as i
//             INNER JOIN candidato as c ON i.candidato_cpf = c.cpf
//             INNER JOIN vaga as v ON v.codigo = i.vaga_codigo
//             WHERE i.candidato_cpf = ?`;
//       const [registros, campos] = await conexao.execute(sql, [termoBusca]);

//       if (registros.length > 0) {
//         // a partir dos registros precisaremos restaurar os objetos
//         const candidato = new Candidato(
//           registros[0].cpf,
//           registros[0].nome,
//           registros[0].endereco,
//           registros[0].telefone,
//           registros[0].email,
//           registros[0].dataNascimento,
//           registros[0].escolaridade,
//           registros[0].curso
//         );

//         let listaVaga = [];
//         for (const registro of registros) {
//           const vaga = new Vaga(
//             registro.codigo,
//             registro.cargo,
//             registro.modalidade,
//             registro.tipoContrato,
//             registro.salario,
//             registro.empresa,
//             registro.localizacao,
//             registro.cargaHoraria
//           );
//           //   const produto = new Produto(
//           //     registro.produto_codigo,
//           //     registro.prod_descricao,
//           //     registro.prod_precoCusto,
//           //     registro.prod_precoVenda,
//           //     registro.prod_dataValidade,
//           //     registro.prod_qtdEstoque,
//           //     categoria
//           //   );
//           //   const itemPedido = new ItemPedido(
//           //     produto,
//           //     registro.quantidade,
//           //     registro.preco_unitario,
//           //     registro.subtotal
//           //   );
//           listaVaga.push(vaga);
//         }
//         const inscricao = new Inscricao(
//           registros.candidato_cpf,
//           registros[0].dataInscricao,
//           registros[0].horarioInscricao,
//           listaVaga
//         );
//         listaInscricoes.push(inscricao);
//       }
//     }

//     return listaInscricoes;
//   }
// }

async consultar(cpf) {
  const listaInscricoes = [];
  const conexao = await conectar();
  let sql, parametros;

  if (cpf) {
      sql = `SELECT i.vaga_codigo, i.candidato_cpf, i.dataInscricao, i.horarioInscricao,
              c.cpf, c.nome, c.endereco, c.telefone, c.email, c.dataNascimento, c.escolaridade, c.curso,
              v.codigo, v.cargo, v.modalidade, v.tipoContrato, v.salario, v.empresa, v.localizacao, v.cargaHoraria
           FROM inscricao AS i
           INNER JOIN candidato AS c ON i.candidato_cpf = c.cpf
           INNER JOIN vaga AS v ON v.codigo = i.vaga_codigo
           WHERE i.candidato_cpf = ?`;
      parametros = [cpf];
  } else {
      sql = `SELECT i.vaga_codigo, i.candidato_cpf, i.dataInscricao, i.horarioInscricao,
              c.cpf, c.nome, c.endereco, c.telefone, c.email, c.dataNascimento, c.escolaridade, c.curso,
              v.codigo, v.cargo, v.modalidade, v.tipoContrato, v.salario, v.empresa, v.localizacao, v.cargaHoraria
           FROM inscricao AS i
           INNER JOIN candidato AS c ON i.candidato_cpf = c.cpf
           INNER JOIN vaga AS v ON v.codigo = i.vaga_codigo`;
      parametros = [];
  }

  try {
      const [registros] = await conexao.execute(sql, parametros);
      registros.forEach(reg => {
          const vaga = new Vaga(reg.codigo, reg.cargo, reg.modalidade, reg.tipoContrato, reg.salario, reg.empresa, reg.localizacao, reg.cargaHoraria);
          const candidato = new Candidato(reg.cpf, reg.nome, reg.endereco, reg.telefone, reg.email, reg.dataNascimento, reg.escolaridade, reg.curso);
          const inscricao = new Inscricao([vaga], reg.dataInscricao, reg.horarioInscricao, candidato);
          listaInscricoes.push(inscricao);
      });
      return listaInscricoes;
  } catch (error) {
      throw new Error("Erro ao consultar inscrições: " + error.message);
  }
}
}