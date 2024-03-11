
import AtividadeExtracurricularDAO from "../Persistencia/AtividadeExtracurricularDAO.js";

export default class AtividadeExtracurricular {
    #codigo;
    #tipoAtividade;
    #horario;
    #dia_semana;
    #membros;

    constructor(codigo, tipoAtividade, horario,  dia_semana, membros) {
        this.#codigo = codigo;
        this.#tipoAtividade = tipoAtividade;
        this.#horario = horario;
        this.#dia_semana = dia_semana;
        this.#membros = membros;
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

    // Código Tipo de Atividade
    get tipoAtividade() {
        return this.#tipoAtividade;
    }

    set tipoAtividade(novoTipoAtividade) {
        this.#tipoAtividade = novoTipoAtividade;
        
    }

    get horario() {
        return this.#horario;
    }

    set horario(novoHorario) {
        this.#horario = novoHorario;
    }

    // Dia da semana 
    get dia_semana() {
        return this.#dia_semana;
    }
    
    set dia_semana(novoDia_semana) {
        this.#dia_semana = novoDia_semana;
    }
    

    // Alunos
    get membros() {
        return this.#membros;
    }

    set membros(novosMembros) {
        this.#membros = novosMembros;
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'tipoAtividade': this.#tipoAtividade,
            'horario': this.#horario,
            'dia_semana': this.#dia_semana,
            'membros': this.#membros

        };
    }

    async gravar() {
        const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
        this.codigo = await atividadeExtracurricularDAO.gravar(this);
    }

    async atualizar() {
        const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
        await atividadeExtracurricularDAO.alterar(this);
    }

    async apagar() {
        const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
        await atividadeExtracurricularDAO.deletar(this);
    }

    async consultar(termoBusca) {
        const atividadeExtracurricularDAO = new AtividadeExtracurricularDAO();
        const listaAtividadeExtracurricular = await atividadeExtracurricularDAO.consultar(termoBusca);
        return listaAtividadeExtracurricular;
    }
    
}
