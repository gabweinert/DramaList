const botaoPerfil = document.getElementById("botaoPerfil");

const dropdownPerfil = document.getElementById("dropdownPerfil");

const botaoTema = document.getElementById("botaoTema");

function aplicarTema() {
    const temaSalvo = localStorage.getItem("temaDramaList");

    if (temaSalvo === "escuro") {
        document.body.classList.add("tema-escuro");
    } else {
        document.body.classList.remove("tema-escuro");
    }
}

function atualizarBotaoTema() {
    if (!botaoTema) {
        return;
    }

    const temaEscuro = document.body.classList.contains("tema-escuro");

    if (temaEscuro) {
        botaoTema.textContent = "☀️ Tema claro";
    } else {
        botaoTema.textContent = "🌙 Tema escuro";
    }
}

function atualizarAvatar() {
    if (!botaoPerfil) {
        return;
    }

    if (botaoPerfil.textContent.trim() !== "") {
        return;
    }

    const dadosSalvos = localStorage.getItem("dadosPerfil");

    if (!dadosSalvos) {
        return;
    }

    try {
        const dados = JSON.parse(dadosSalvos);

        const nome = dados.nome ? dados.nome.trim() : "";

        if (nome !== "") {
            const inicial = nome.charAt(0).toUpperCase();

            botaoPerfil.textContent = inicial;
            botaoPerfil.setAttribute("title", nome);
        }
    } catch (erro) {
        console.error("Erro ao carregar dados do perfil:", erro);
    }
}

if (botaoPerfil && dropdownPerfil) {
    botaoPerfil.addEventListener("click", function (evento) {
        evento.stopPropagation();

        const menuAberto = dropdownPerfil.classList.toggle("aberto");

        botaoPerfil.setAttribute("aria-expanded", menuAberto);
    });

    dropdownPerfil.addEventListener("click", function (evento) {
        evento.stopPropagation();
    });
}

document.addEventListener("click", function () {
    if (!dropdownPerfil) {
        return;
    }

    dropdownPerfil.classList.remove("aberto");

    if (botaoPerfil) {
        botaoPerfil.setAttribute("aria-expanded", "false");
    }
});

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        const temaEscuro = document.body.classList.toggle("tema-escuro");

        localStorage.setItem("temaDramaList", temaEscuro ? "escuro" : "claro");

        atualizarBotaoTema();

        if (dropdownPerfil) {
            dropdownPerfil.classList.remove("aberto");
        }

        if (botaoPerfil) {
            botaoPerfil.setAttribute("aria-expanded", "false");
        }
    });
}

aplicarTema();

atualizarBotaoTema();

atualizarAvatar();
