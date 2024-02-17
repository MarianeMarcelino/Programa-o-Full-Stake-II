import TurmaDAO from "../Persistencia/turmaDAO.js";

export default class Turma {
    //definição dos atributos privados
    #codigo;
    #serie;

    constructor(codigo=0, serie=''){
        this.#codigo=codigo;
        this.#serie=serie;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get serie(){
        return this.#serie;
    }

    set serie(novaSerie){
        this.#serie = novaSerie;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            serie:this.#serie
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const turmaDAO = new TurmaDAO();
        await turmaDAO.gravar(this);
    }

    async excluir(){
        const turmaDAO = new TurmaDAO();
        await turmaDAO.excluir(this);
    }

    async atualizar(){
        const turmaDAO = new TurmaDAO();
        await turmaDAO.atualizar(this);

    }

    async consultar(parametro){
        const turmaDAO = new TurmaDAO();
        return await turmaDAO.consultar(parametro);
    }
}