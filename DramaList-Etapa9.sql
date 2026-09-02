CREATE DATABASE DramaList
USE DramaList;

CREATE TABLE Usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,

    PRIMARY KEY (idUsuario)
);

CREATE TABLE Drama (
    idDrama INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    paisOrigem VARCHAR(45) NOT NULL,
    dataLancamento DATE NOT NULL,
    genero VARCHAR(45) NOT NULL,
    numeroEpisodios INT NOT NULL,
    sinopse TEXT NOT NULL,
    plataformas VARCHAR(255) NOT NULL,

    PRIMARY KEY (idDrama)
);

CREATE TABLE Avaliacao (
    idAvaliacao INT NOT NULL AUTO_INCREMENT,
    nota INT NOT NULL,
    resenha VARCHAR(255),
    idUsuario INT NOT NULL,
    idDrama INT NOT NULL,

    PRIMARY KEY (idAvaliacao),

    CONSTRAINT chk_avaliacao_nota
        CHECK (nota BETWEEN 1 AND 5),

    CONSTRAINT fk_avaliacao_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES Usuario(idUsuario)
        ON DELETE CASCADE,

    CONSTRAINT fk_avaliacao_drama
        FOREIGN KEY (idDrama)
        REFERENCES Drama(idDrama)
        ON DELETE CASCADE
);

CREATE TABLE MinhaLista (
    idMinhaLista INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idDrama INT NOT NULL,
    status VARCHAR(30) NOT NULL,

    PRIMARY KEY (idMinhaLista),

    CONSTRAINT uk_minhalista_usuario_drama
        UNIQUE (idUsuario, idDrama),

    CONSTRAINT fk_minhalista_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES Usuario(idUsuario)
        ON DELETE CASCADE,

    CONSTRAINT fk_minhalista_drama
        FOREIGN KEY (idDrama)
        REFERENCES Drama(idDrama)
        ON DELETE CASCADE
);

INSERT INTO Usuario
(nome, email, senha)
VALUES
('Ana Souza', 'ana.souza@email.com', 'senha123'),
('Bruno Lima', 'bruno.lima@email.com', 'senha456'),
('Carla Mendes', 'carla.mendes@email.com', 'senha789'),
('Diego Rocha', 'diego.rocha@email.com', 'senha321'),
('Elisa Castro', 'elisa.castro@email.com', 'senha654');

INSERT INTO Drama
(
    titulo,
    paisOrigem,
    dataLancamento,
    genero,
    numeroEpisodios,
    sinopse,
    plataformas
)
VALUES

(
    'Alchemy of Souls',
    'Coreia do Sul',
    '2022-06-18',
    'Fantasia',
    20,
    'Uma poderosa feiticeira, presa no corpo de uma mulher cega, encontra um homem de uma família nobre que deseja mudar seu destino.',
    'Netflix'
),

(
    'Business Proposal',
    'Coreia do Sul',
    '2022-02-28',
    'Comédia',
    12,
    'Uma jovem aceita participar de um encontro às cegas no lugar de sua amiga, sem imaginar que o homem que encontrará é seu próprio chefe.',
    'Netflix'
),

(
    'Crash Landing on You',
    'Coreia do Sul',
    '2019-12-14',
    'Romance',
    16,
    'Após um acidente inesperado, uma empresária sul-coreana acaba na Coreia do Norte e conhece um oficial que decide ajudá-la a voltar para casa.',
    'Netflix'
),

(
    'Extraordinary Attorney Woo',
    'Coreia do Sul',
    '2022-06-29',
    'Drama',
    16,
    'Uma jovem advogada brilhante começa sua carreira em um grande escritório de advocacia enquanto enfrenta desafios profissionais e pessoais.',
    'Netflix'
),

(
    'Lovely Runner',
    'Coreia do Sul',
    '2024-04-08',
    'Romance',
    16,
    'Uma fã recebe a oportunidade inesperada de voltar ao passado e tenta mudar o destino de seu artista favorito.',
    'Viki'
),

(
    'Moving',
    'Coreia do Sul',
    '2023-08-09',
    'Ação',
    20,
    'Adolescentes que herdaram habilidades especiais de seus pais tentam viver normalmente enquanto enfrentam perigos que ameaçam suas famílias.',
    'Disney+'
),

(
    'My Demon',
    'Coreia do Sul',
    '2023-11-24',
    'Fantasia',
    16,
    'Um demônio perde seus poderes após se envolver com uma herdeira poderosa e os dois acabam presos em um relacionamento inesperado.',
    'Netflix'
),

(
    'Queen of Tears',
    'Coreia do Sul',
    '2024-03-09',
    'Romance',
    16,
    'Um casal que parece ter tudo enfrenta uma grave crise no casamento e precisa redescobrir o significado de permanecer juntos.',
    'Netflix'
),

(
    'True Beauty',
    'Coreia do Sul',
    '2020-12-09',
    'Romance',
    16,
    'Uma estudante aprende técnicas de maquiagem para esconder suas inseguranças e acaba envolvida em um triângulo amoroso.',
    'Viki, Netflix'
),

(
    'Twenty-Five Twenty-One',
    'Coreia do Sul',
    '2022-02-12',
    'Romance',
    16,
    'Uma jovem apaixonada por esgrima conhece um rapaz que está reconstruindo sua vida e os dois acompanham juntos as mudanças de suas juventudes.',
    'Netflix'
),

(
    'When Life Gives You Tangerines',
    'Coreia do Sul',
    '2025-03-07',
    'Romance',
    16,
    'Uma história de amor que atravessa décadas acompanha dois jovens em Jeju e as diferentes fases de suas vidas, sonhos e desafios.',
    'Netflix'
);

INSERT INTO Avaliacao
(nota, resenha, idUsuario, idDrama)
VALUES

(
    5,
    'Uma história envolvente e cheia de fantasia.',
    1,
    1
),

(
    4,
    'Uma comédia romântica divertida e leve.',
    2,
    2
),

(
    5,
    'Um romance emocionante e inesquecível.',
    3,
    3
),

(
    5,
    'Uma história emocionante com personagens marcantes.',
    4,
    4
),

(
    5,
    'Uma história romântica que prende do começo ao fim.',
    5,
    5
),

(
    4,
    'Uma mistura muito boa de ação, poderes e drama.',
    1,
    6
),

(
    4,
    'Uma fantasia divertida com uma ótima história de romance.',
    2,
    7
),

(
    5,
    'Um romance emocionante com ótimos personagens.',
    3,
    8
),

(
    4,
    'Uma história divertida e muito gostosa de acompanhar.',
    4,
    9
),

(
    5,
    'Uma história emocionante sobre juventude, sonhos e amor.',
    5,
    10
),

(
    5,
    'Uma história emocionante sobre amor, vida e amadurecimento.',
    1,
    11
);

INSERT INTO MinhaLista
(idUsuario, idDrama, status)
VALUES

(
    1,
    1,
    'Quero assistir'
),

(
    1,
    2,
    'Quero assistir'
),

(
    1,
    3,
    'Quero assistir'
),

(
    1,
    4,
    'Assistindo'
),

(
    1,
    5,
    'Assistindo'
),

(
    1,
    6,
    'Concluído'
),

(
    1,
    7,
    'Concluído'
);

SELECT * FROM Usuario;

SELECT * FROM Drama;

SELECT * FROM Avaliacao;

SELECT * FROM MinhaLista;

