CREATE DATABASE academia;
USE academia;

CREATE TABLE clientes(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(128) NOT NULL,
    endereco VARCHAR(128) NOT NULL,
    telefone VARCHAR(16),
    status VARCHAR(16),
    plano VARCHAR(32)
);

CREATE TABLE admins(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL
);

CREATE TABLE treinos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    nome VARCHAR(128) NOT NULL,
    descricao TEXT,
    dia_semana VARCHAR(32),
    CONSTRAINT `fk_cliente_treino_id`
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
        ON UPDATE CASCADE
);

CREATE TABLE aulas(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    professor VARCHAR(128),
    horario TIME
);

CREATE TABLE agendamentos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    aula_id INT UNSIGNED NOT NULL,
    data DATE NOT NULL,
    presente BOOLEAN DEFAULT FALSE,
    CONSTRAINT `fk_cliente_agendamento_id`
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
        ON UPDATE CASCADE,
    CONSTRAINT `fk_aula_agendamento_id`
        FOREIGN KEY (aula_id) REFERENCES aulas (id)
        ON UPDATE CASCADE
);

CREATE TABLE pagamentos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    data_pagamento DATE NOT NULL,
    valor DECIMAL(8,2) UNSIGNED NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    CONSTRAINT `fk_cliente_pagamento_id`
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
        ON UPDATE CASCADE
);

INSERT INTO admins (nome, email) VALUES ("admin", "admin@gmail.com");
