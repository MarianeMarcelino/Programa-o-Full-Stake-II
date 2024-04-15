import AlunoDAO from "../Persistencia/alunoDAO.js";

export default class Aluno{
    #ra;
    #nome;
    #dataNascimento;
    #telefone;
    #email;
    #cpf;
    #turma;

    constructor(ra=0,nome="", dataNascimento="", 
                telefone="",email="", cpf="",turma={}
                ){
        this.#ra=ra;
        this.#nome=nome;
        this.#dataNascimento=dataNascimento;
        this.#telefone=telefone;
        this.#email=email;
        this.#cpf=cpf;
        this.#turma=turma;
    }

    get ra(){
        return this.#ra;
    }
    set ra(novoRa){
        this.#ra = novoRa;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome=novoNome;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(novaData){
        this.#dataNascimento = novaData
    }

    get telefone(){
        return this.#telefone;
    }
    
    set telefone(novoTelefone){
        this.#telefone = novoTelefone
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get turma(){
        return this.#turma;
    }

    set turma(novaTurma){
        this.#turma = novaTurma;
    }


    toJSON(){
        return {
            ra:this.#ra,
            nome:this.#nome,
            dataNascimento:this.#dataNascimento,
            telefone:this.#telefone,
            email:this.#email,
            cpf:this.#cpf,
            turma:this.#turma
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const alunoDAO = new AlunoDAO();
        await alunoDAO.gravar(this);
     }
 
     async excluir(){
        const alunoDAO = new AlunoDAO();
        await alunoDAO.excluir(this);
     }
 
     async alterar(){
        const alunoDAO = new AlunoDAO();
        await alunoDAO.atualizar(this);
     }
 
     async consultar(termo){
        const alunoDAO = new AlunoDAO();
        return await alunoDAO.consultar(termo);
     }

}