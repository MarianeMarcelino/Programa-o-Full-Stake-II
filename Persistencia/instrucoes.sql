CREATE DATABASE sistema;

USE sistema;

CREATE TABLE turma(
    turma_codigo INT NOT NULL AUTO_INCREMENT,
    turma_serie VARCHAR(100) NOT NULL,
    CONSTRAINT pk_turma PRIMARY KEY(turma_codigo)
);

CREATE TABLE aluno(
    aluno_ra INT NOT NULL AUTO_INCREMENT,
    aluno_nome VARCHAR(100) NOT NULL,
    aluno_dataNascimento DATE NOT NULL,
    aluno_telefone VARCHAR(100) NOT NULL,
    aluno_email VARCHAR(100) NOT NULL,
    aluno_cpf VARCHAR(100) NOT NULL,
    turma_codigo INT NOT NULL,
    CONSTRAINT pk_aluno PRIMARY KEY(aluno_ra),
    CONSTRAINT fk_turma FOREIGN KEY (turma_codigo) REFERENCES turma (turma_codigo)
);
