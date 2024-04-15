import CandidatoDAO from "../Persistencia/CandidatoDAO.js";

export default class Candidato {

    // Atributos
    #cpf;
    #nome;
    #endereco;
    #telefone;
    #email;
    #dataNascimento;
    #escolaridade;
    #curso;

    constructor(cpf, nome, endereco, telefone, email, dataNascimento, escolaridade, curso) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#escolaridade = escolaridade;
        this.#curso = curso;
    }

    // Métodos de acesso (GET) e modificação (SET)

    //CPF
    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    //NOME
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    //ENDEREÇO
    get endereco() {
        return this.#endereco;
    }
    
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    //TELEFONE
    get telefone() {
        return this.#telefone;
    }
        
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    //EMAIL
    get email() {
        return this.#email;
    }
        
    set email(novoEmail) {
        this.#email = novoEmail;
    }    
   
    //DATA DE NASCIMENTO
    get dataNascimento() {
        return this.#dataNascimento;
    }
        
    set dataNascimento(novoDataNascimento) {
        this.#dataNascimento = novoDataNascimento;
    }    

    //ESCOLARIDADE
    get escolaridade() {
        return this.#escolaridade;
    }
        
    set escolaridade(novoEscolaridade) {
        this.#escolaridade = novoEscolaridade;
    }  
    
    //CURSO
    get curso() {
        return this.#curso;
    }
        
    set curso(novoCurso) {
        this.#curso = novoCurso;
    }  

    // JSON
    toJSON() {
        return {
            'cpf': this.#cpf,
            'nome': this.#nome,
            'endereco': this.#endereco,
            'telefone': this.#telefone,
            'email': this.#email,
            'dataNascimento': this.#dataNascimento,
            'escolaridade': this.#escolaridade,
            'curso': this.#curso
        };
    }

    //FUNÇÕES
    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        this.cpf = await candidatoDAO.incluir(this);
    }

    async atualizar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.alterar(this);
    }

    async apagar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const candidatoDAO = new CandidatoDAO();
        const listaCandidatos = await candidatoDAO.consultar(termoBusca);
        return listaCandidatos;
    }

}