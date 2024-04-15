import InscricaoDAO from '../Persistencia/InscricaoDAO.js';
import Vaga from './Vaga.js';

export default class Inscricao {
    #vagas;
    #dataInscricao;
    #horarioInscricao;
    #candidato_cpf;
    
    constructor(vagas, dataInscricao, horarioInscricao, candidato_cpf) {
        this.#vagas = vagas;
        this.#dataInscricao = dataInscricao;
        this.#horarioInscricao = horarioInscricao;
        this.#candidato_cpf = candidato_cpf;
    }

    // Métodos de acesso (Get) e modificação (Set)

    // VAGA
    get vagas() {
        return this.#vagas;
    }

    set vagas(novaVagas) {
        this.#vagas = novaVagas;
    }

    // DATA DE INSCRIÇÃO
    get dataInscricao() {
        return this.#dataInscricao;
    }

    set dataInscricao(novaDataInscricao) {
        this.#dataInscricao = novaDataInscricao;
    }

    // HORÁRIO DE INSCRIÇÃO
    get horarioInscricao() {
        return this.#horarioInscricao;
    }

    set horarioInscricao(novoHorarioInscricao) {
        this.#horarioInscricao = novoHorarioInscricao;
    }  

    // CANDIDATO
    get candidato_cpf() {
        return this.#candidato_cpf;
    }

    set candidato_cpf(novoCandidato_cpf) {
        this.#candidato_cpf = novoCandidato_cpf;
    }      
        
    // // JSON
    // toJSON() {
    //     return {
    //         'vagas': this.#vagas.map(vaga => vagas.toJSON()),
    //         'dataInscricao': this.#dataInscricao,
    //         'horarioInscricao': this.#horarioInscricao,
    //         'candidato_cpf': this.#candidato_cpf
    //     };
    // }

    toJSON() {
        return {
            'vagas': this.#vagas.map(vaga => vaga.toJSON()), // Garanta que vaga tem um método toJSON()
            'dataInscricao': this.#dataInscricao,
            'horarioInscricao': this.#horarioInscricao,
            'candidato_cpf': this.#candidato_cpf
        };
    }
    
    async gravar() {
        const inscricaoDAO = new InscricaoDAO();
        // this.cliente_cpf = await InscricaoDao.gravar(this);
        await inscricaoDAO.gravar(this);

    }

    async consultar(termoBusca) {
        const inscricaoDAO = new InscricaoDAO();
        const listaInscricoes = await inscricaoDAO.consultar(termoBusca);
        return listaInscricoes;
    }
}

