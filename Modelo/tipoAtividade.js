import TipoAtividadeDAO from "../Persistencia/TipoAtividadeDAO.js";

export default class TipoAtividade {
    #codigo;
    #nome;
    #descricao;

    constructor(codigo, nome, descricao) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descricao = descricao;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome === "") {
            console.log("Dado não preenchido");
        } else {
            this.#nome = novoNome;
        }
    }


    // Descrição
    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        if (novaDescricao === "") {
            console.log("Dado não preenchido");
        } else {
            this.#descricao = novaDescricao;
        }
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'nome': this.#nome,
            'descricao': this.#descricao
        };
    }

    async gravar() {
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        this.codigo = await tipoAtividadeDAO.adicionar(this);
    }

    async atualizar() {
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        await tipoAtividadeDAO.alterar(this);
    }

    async apagar() {
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        await tipoAtividadeDAO.deletar(this);
    }

    async consultarPorNome(nome) {
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        const listaTipoAtividade = await tipoAtividadeDAO.consultar(nome);
        return listaTipoAtividade;
    }

}