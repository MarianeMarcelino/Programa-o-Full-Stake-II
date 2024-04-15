import TipoAtividadeDAO from "../Persistencia/TipoAtividadeDAO.js";

export default class TipoAtividade {
    #codigo;
    #nome;
    #descricao;

    constructor(codigo=0, nome='', descricao='') {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descricao = descricao;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }


    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }


    // Descrição
    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
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
        this.codigo = await tipoAtividadeDAO.gravar(this);
    }

    async excluir(){
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        await tipoAtividadeDAO.excluir(this);
    }

    async atualizar() {
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        await tipoAtividadeDAO.atualizar(this);
    }

    async consultar(parametro){
        const tipoAtividadeDAO = new TipoAtividadeDAO();
        return await tipoAtividadeDAO.consultar(parametro);
    }

}