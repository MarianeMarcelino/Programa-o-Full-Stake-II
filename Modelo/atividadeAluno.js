export default class AlunoAtividade {
    #aluno;
    #data_inscricao;

    
    constructor(aluno, data_inscricao) {
        this.#aluno = aluno;
        this.#data_inscricao = data_inscricao;
    }

    // Métodos de acesso (get) e modificação (set)
    get aluno() {
        return this.#aluno;
    }

    set aluno(novoAluno) {
        this.#aluno = novoAluno;
    }

    get data_inscricao() {
        return this.#data_inscricao;
    }

    set data_inscricao(novoData_inscricao) {
        this.#data_inscricao = novoData_inscricao;
    }

    
    // JSON
    toJSON() {
        return {
            'aluno': this.#aluno,
            'data_inscricao': this.#data_inscricao,
        };
    }
}