CREATE DATABASE sistema;

USE processoSeletivo;

-- Tabela para armazenar os candidatos
CREATE TABLE candidato (
    cpf VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dataNascimento VARCHAR(255) NOT NULL,
    escolaridade VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NULL,
    CONSTRAINT pk_candidato PRIMARY KEY (cpf)
);

-- Tabela para armazenar as vagas
CREATE TABLE vaga (
    codigo INT AUTO_INCREMENT,
    cargo VARCHAR(255) NOT NULL,
    modalidade VARCHAR(255) NOT NULL,
    tipoContrato VARCHAR(255) NOT NULL,
    salario VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    cargaHoraria VARCHAR(255) NOT NULL,
    CONSTRAINT pk_vaga PRIMARY KEY (codigo)
    
);

-- Tabela para armazenar os itens do pedido
CREATE TABLE inscricao (
    candidato_cpf VARCHAR(255) NOT NULL,
    vaga_codigo INT NOT NULL,
    dataInscricao VARCHAR(255) NOT NULL,
    horarioInscricao VARCHAR(255) NOT NULL,
    CONSTRAINT pk_inscricao PRIMARY KEY (candidato_cpf, vaga_codigo),
    CONSTRAINT fk_candidato FOREIGN KEY (candidato_cpf) REFERENCES candidato(cpf),
    CONSTRAINT fk_vaga FOREIGN KEY (vaga_codigo) REFERENCES vaga(codigo)
);

