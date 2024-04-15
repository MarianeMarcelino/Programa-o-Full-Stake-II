CREATE DATABASE sge;

USE sge

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


CREATE TABLE tipoAtividade (
    codigo INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    CONSTRAINT PK_TIPOATIVIDADE PRIMARY KEY(codigo)
);

CREATE TABLE atividadeExtracurricular (
    codigo INT AUTO_INCREMENT,
    tipoAtividade_codigo INT,
    horario VARCHAR(255) NOT NULL,
    dia_semana VARCHAR(255) NOT NULL,
    CONSTRAINT PK_ATIVIDADEEXTRACURRICULAR PRIMARY KEY(codigo),
    CONSTRAINT FK_TIPOATIVIDADE FOREIGN KEY (tipoAtividade_codigo) REFERENCES tipoAtividade(codigo)
);

CREATE TABLE atividade_aluno (
    aluno_ra INT NOT NULL,
    atividadeExtracurricular_codigo INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (aluno_ra, atividadeExtracurricular_codigo),
    CONSTRAINT FK_ATIVIDADEEXTRACURRICULAR FOREIGN KEY (atividadeExtracurricular_codigo) REFERENCES atividadeExtracurricular(codigo),
    CONSTRAINT FK_ALUNO FOREIGN KEY (aluno_ra) REFERENCES aluno (aluno_ra)
);


