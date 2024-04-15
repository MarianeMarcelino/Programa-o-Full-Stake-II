import VagaDAO from "../Persistencia/VagaDAO.js";

export default class Vaga {
    #codigo;
    #cargo;
    #modalidade;
    #tipoContrato;
    #salario;
    #empresa;
    #localizacao;
    #cargaHoraria;

    constructor(codigo, cargo, modalidade,  tipoContrato, salario, empresa, localizacao, cargaHoraria) {
        this.#codigo = codigo;
        this.#cargo = cargo;
        this.#modalidade = modalidade;
        this.#tipoContrato = tipoContrato;
        this.#salario = salario;
        this.#empresa = empresa;
        this.#localizacao = localizacao;
        this.#cargaHoraria = cargaHoraria;
    }

    // Métodos de acesso (Get) e modificação (Set)

    //CÓDIGO
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    //CARGO
    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }    

    //MODALIDADE
    get modalidade() {
        return this.#modalidade;
    }

    set modalidade(novaModalidade) {
        this.#modalidade = novaModalidade;
    }

    //TIPO DE CONTRATO
    get tipoContrato() {
        return this.#tipoContrato;
    }

    set tipoContrato(novoTipoContrato) {
        this.#tipoContrato = novoTipoContrato;
    }   

    //SALÁRIO
    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }      

    //EMPRESA
    get empresa() {
        return this.#empresa;
    }

    set empresa(novaEmpresa) {
        this.#empresa = novaEmpresa;
    }         

    //LOCALIZAÇÃO
    get localizacao() {
        return this.#localizacao;
    }

    set localizacao(novaLocalizacao) {
        this.#localizacao = novaLocalizacao;
    }       

    //CARGA HORÁRIA
    get cargaHoraria() {
        return this.#cargaHoraria;
    }

    set cargaHoraria(novaCargaHoraria) {
        this.#cargaHoraria = novaCargaHoraria;
    } 
    
    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'cargo': this.#cargo,
            'modalidade': this.#modalidade,
            'tipoContrato': this.#tipoContrato,
            'salario': this.#salario,
            'empresa': this.#empresa,
            'localizacao': this.#localizacao,
            'cargaHoraria': this.#cargaHoraria,

        };
    }
    
    //FUNÇÕES
    async gravar() {
        const vagaDAO = new VagaDAO();
        this.codigo = await vagaDAO.gravar(this);
    }

    async atualizar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.atualizar(this);
    }

    async apagar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const vagaDAO = new VagaDAO();
        const listaVagas = await vagaDAO.consultar(termoBusca);
        return listaVagas;
    }
    
}
