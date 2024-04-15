import Candidato from "../Modelo/Candidato.js";
import Inscricao from "../Modelo/Inscricao.js";
import Vaga from "../Modelo/Vaga.js";

export default class InscricaoCtrl {
  //   gravar(requisicao, resposta) {
  //     resposta.type('application/json');
  //     if (requisicao.method === 'POST' && requisicao.is('application/json')) {
  //         const dados = requisicao.body;
  //         const candidato_cpf = dados.candidato_cpf;
  //         const dataInscricao = new Date(dados.dataInscricao).toLocaleDateString();
  //         const horarioInscricao = dados.horarioInscricao;
  //         const vaga_codigo = dados.vaga_codigo;  // Certifique-se de que isso é esperado como array ou ajuste conforme necessário

  //         const objCandidato = new Candidato(candidato_cpf);
  //         let vagas = [];
  //         for (const codigo of vaga_codigo) { // Supondo que vaga_codigo seja um array
  //             const objVaga = new Vaga(codigo);
  //             vagas.push(objVaga);
  //         }

  //         const inscricao = new Inscricao(objCandidato, vagas, dataInscricao, horarioInscricao);
  //         inscricao.gravar().then(() => {
  //             resposta.status(200).json({
  //                 status: true,
  //                 mensagem: "Inscrição registrada com sucesso!",
  //             });
  //         }).catch((erro) => {
  //             resposta.status(500).json({
  //                 status: false,
  //                 mensagem: "Erro ao registrar a inscrição: " + erro.message
  //             });
  //         });
  //     } else {
  //         resposta.status(400).json({
  //             status: false,
  //             mensagem: "Requisição inválida!"
  //         });
  //     }
  // }

  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
        const dados = requisicao.body;
        
        // Validação básica
        if (!dados.candidato_cpf || !dados.vaga_codigo || !dados.dataInscricao || !dados.horarioInscricao) {
            return resposta.status(400).json({
                status: false,
                mensagem: "Dados incompletos para a inscrição!"
            });
        }

        let vagas = dados.vaga_codigo.map(codigo => new Vaga(codigo));
        const inscricao = new Inscricao(vagas, dados.dataInscricao, dados.horarioInscricao, dados.candidato_cpf);

        inscricao.gravar().then(() => {
            resposta.status(200).json({
                status: true,
                mensagem: "Inscrição registrada com sucesso!"
            });
        }).catch((erro) => {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao registrar a inscrição: " + erro.message
            });
        });
    } else {
        resposta.status(400).json({
            status: false,
            mensagem: "Requisição inválida!"
        });
    }
}

//   consultar(requisicao, resposta) {
//     resposta.type("application/json");
//     if (requisicao.method === "GET") {
//       //tentar obter o código do pedido a partir dos parâmetros da URL
//       let termo = requisicao.params.termo;
//       if (!isNaN(termo)) {
//         const inscricao = new Inscricao(0);
//         inscricao
//           .consultar(termo)
//           .then((listaInscricoes) => {
//             resposta.status(200).json({
//               status: true,
//               listaInscricoes: listaInscricoes,
//             });
//           })
//           .catch((erro) => {
//             resposta.status(500).json({
//               status: false,
//               mensagem: "Erro ao consultar a Inscrição: " + erro.message,
//             });
//           });
//       } else {
//         resposta.status(400).json({
//           status: false,
//           mensagem: "Por favor, informe um códido de inscrição válido!",
//         });
//       }
//     } else {
//       resposta.status(400).json({
//         status: false,
//         mensagem: "Requisição inválida!",
//       });
//     }
//   }
// }

// consultar(requisicao, resposta) {
//   resposta.type("application/json");
//   // Aqui, você extrai o CPF e quaisquer outros dados necessários dos parâmetros de consulta
//   const { cpf } = requisicao.query;

//   if (cpf) {
//       const inscricao = new Inscricao(0);
//       inscricao.consultar(cpf).then((listaInscricoes) => {
//           resposta.status(200).json({
//               status: true,
//               listaInscricoes: listaInscricoes,
//           });
//       }).catch((erro) => {
//           resposta.status(500).json({
//               status: false,
//               mensagem: "Erro ao consultar a Inscrição: " + erro.message,
//           });
//       });
//   } else {
//       resposta.status(400).json({
//           status: false,
//           mensagem: "Por favor, informe um CPF válido nos parâmetros de consulta!",
//       });
//   }
// }
// }

consultar(requisicao, resposta) {
  resposta.type("application/json");
  const cpf = requisicao.query.cpf; // Recebendo CPF como parâmetro de consulta, opcional

  const inscricao = new Inscricao();
  inscricao.consultar(cpf).then((listaInscricoes) => {
      resposta.status(200).json({
          status: true,
          listaInscricoes: listaInscricoes,
      });
  }).catch((erro) => {
      resposta.status(500).json({
          status: false,
          mensagem: "Erro ao consultar a Inscrição: " + erro.message,
      });
  });
}
}