const posterDrama = document.getElementById("posterDrama");

const tituloDrama = document.getElementById("tituloDrama");

const avaliacaoDrama = document.getElementById("avaliacaoDrama");

const generosDrama = document.getElementById("generosDrama");

const plataformasDrama = document.getElementById("plataformasDrama");

const sinopseDrama = document.getElementById("sinopseDrama");

const anoDrama = document.getElementById("anoDrama");

const episodiosDrama = document.getElementById("episodiosDrama");

const statusDrama = document.getElementById("statusDrama");

const botaoLista = document.getElementById("botaoLista");

const gridRecomendacoes = document.getElementById("gridRecomendacoes");

const parametros = new URLSearchParams(window.location.search);

const dramaSelecionado = parametros.get("drama");

function pegarMinhaLista() {
    const listaSalva = localStorage.getItem("minhaLista");

    if (!listaSalva) {
        return [];
    }

    return JSON.parse(listaSalva);
}

function salvarMinhaLista(lista) {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
}

function pegarStatus() {
    const statusSalvo = localStorage.getItem("statusDramas");

    if (!statusSalvo) {
        return {};
    }

    return JSON.parse(statusSalvo);
}

function salvarStatus(status) {
    localStorage.setItem("statusDramas", JSON.stringify(status));
}

function estaNaLista(idDrama) {
    const lista = pegarMinhaLista();

    return lista.includes(idDrama);
}

function atualizarBotaoLista() {
    if (estaNaLista(dramaSelecionado)) {
        botaoLista.textContent = "− Remover da Minha Lista";
    } else {
        botaoLista.textContent = "+ Adicionar à Minha Lista";
    }
}

botaoLista.addEventListener("click", function () {
    let lista = pegarMinhaLista();

    const status = pegarStatus();

    if (lista.includes(dramaSelecionado)) {
        lista = lista.filter(function (id) {
            return id !== dramaSelecionado;
        });

        delete status[dramaSelecionado];
    } else {
        lista.push(dramaSelecionado);

        status[dramaSelecionado] = "Quero assistir";
    }

    salvarMinhaLista(lista);

    salvarStatus(status);

    atualizarBotaoLista();
});

function carregarRecomendacoes(idDramaAtual) {
    if (!gridRecomendacoes) {
        return;
    }

    const dramaAtual = dramas[idDramaAtual];

    if (!dramaAtual) {
        return;
    }

    const generosAtuais = dramaAtual.generos || [];

    const recomendacoes = Object.entries(dramas)

            .filter(function ([idDrama]) {
                return idDrama !== idDramaAtual;
            })

            .map(function ([idDrama, drama]) {
                const generosDrama = drama.generos || [];

                const generosEmComum = generosDrama.filter(function (genero) {
                    return generosAtuais.includes(genero);
                });

                return {
                    id: idDrama,

                    drama: drama,

                    pontos: generosEmComum.length,
                };
            })

            .filter(function (item) {
                return item.pontos > 0;
            })

            .sort(function (a, b) {
                if (b.pontos !== a.pontos) {
                    return b.pontos - a.pontos;
                }

                const avaliacaoA = parseFloat(a.drama.avaliacao.replace(",", "."));

                const avaliacaoB = parseFloat(b.drama.avaliacao.replace(",", "."));

                return avaliacaoB - avaliacaoA;
            })

            .slice(0, 5);

    gridRecomendacoes.innerHTML = "";

    recomendacoes.forEach(function (item) {
        const card = document.createElement("article");

        card.classList.add("card-recomendacao");

        card.addEventListener("click", function () {
            window.location.href = `detalhes.html?drama=${item.id}`;
        });

        const poster = document.createElement("div");

        poster.classList.add("poster-recomendacao");

        const imagem = document.createElement("img");

        imagem.src = item.drama.poster;

        imagem.alt = `Poster de ${item.drama.titulo}`;

        poster.appendChild(imagem);

        const informacoes = document.createElement("div");

        informacoes.classList.add("info-recomendacao");

        const titulo = document.createElement("h3");

        titulo.textContent = item.drama.titulo;

        const avaliacao = document.createElement("p");

        avaliacao.classList.add("avaliacao-recomendacao");

        avaliacao.innerHTML = `<span>★</span> ${item.drama.avaliacao}`;

        informacoes.appendChild(titulo);

        informacoes.appendChild(avaliacao);

        card.appendChild(poster);

        card.appendChild(informacoes);

        gridRecomendacoes.appendChild(card);
    });
}

function carregarDrama() {
    const drama = dramas[dramaSelecionado];

    if (!drama) {
        tituloDrama.textContent = "Drama não encontrado";

        posterDrama.src = "../img/logodramalist.png";

        posterDrama.alt = "Drama não encontrado";

        avaliacaoDrama.textContent = "--";

        generosDrama.innerHTML = "";

        plataformasDrama.innerHTML = "";

        sinopseDrama.textContent = "Não encontramos o drama solicitado.";

        anoDrama.textContent = "--";

        episodiosDrama.textContent = "--";

        statusDrama.textContent = "--";

        botaoLista.style.display = "none";

        if (gridRecomendacoes) {
            gridRecomendacoes.innerHTML = "";
        }

        return;
    }

    posterDrama.src = drama.poster;

    posterDrama.alt = `Poster de ${drama.titulo}`;

    tituloDrama.textContent = drama.titulo;

    avaliacaoDrama.textContent = drama.avaliacao;

    sinopseDrama.textContent = drama.sinopse;

    anoDrama.textContent = drama.ano;

    episodiosDrama.textContent = drama.episodios;

    statusDrama.textContent = drama.status;

    generosDrama.innerHTML = "";

    drama.generos.forEach(function (genero) {
        const elemento = document.createElement("span");

        elemento.textContent = genero;

        generosDrama.appendChild(elemento);
    });

    plataformasDrama.innerHTML = "";

    drama.plataformas.forEach(function (plataforma) {
        const elemento = document.createElement("span");

        elemento.classList.add("plataforma-tag");

        elemento.textContent = plataforma;

        plataformasDrama.appendChild(elemento);
    });

    atualizarBotaoLista();

    carregarRecomendacoes(dramaSelecionado);
}

carregarDrama();
