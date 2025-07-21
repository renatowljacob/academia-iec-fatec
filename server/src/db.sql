CREATE TABLE clientes(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    senha VARCHAR(256) NOT NULL,
    telefone VARCHAR(16),
    data_nascimento DATE NOT NULL
);

CREATE TABLE admins(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    senha VARCHAR(256) NOT NULL
);

CREATE TABLE treinos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    nome VARCHAR(128) NOT NULL,
    descricao TEXT,
    data_inicio DATE,
    CONSTRAINT `fk_cliente_id`
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
    CONSTRAINT `fk_cliente_id`
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
        ON UPDATE CASCADE
    CONSTRAINT `fk_aula_id`
        FOREIGN KEY (aula_id) REFERENCES aulas (id)
        ON UPDATE CASCADE
);

CREATE TABLE pagamentos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    data_pagamento DATE NOT NULL,
    valor DECIMAL(8,2) UNSIGNED,
    status VARCHAR(64),
    CONSTRAINT `fk_cliente_id`
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
        ON UPDATE CASCADE
);

