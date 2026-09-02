const nomePerfil =
        document.getElementById("nomePerfil");

const avatarPerfil =
        document.getElementById("avatarPerfil");

const nomeExibicao =
        document.getElementById("nomeExibicao");

const emailExibicao =
        document.getElementById("emailExibicao");

const botaoEditarPerfil =
        document.getElementById("botaoEditarPerfil");

const botaoAlterarSenha =
        document.getElementById("botaoAlterarSenha");

const formularioEditar =
        document.getElementById("formularioEditar");

const formularioSenha =
        document.getElementById("formularioSenha");

const salvarPerfil =
        document.getElementById("salvarPerfil");

const cancelarEdicao =
        document.getElementById("cancelarEdicao");

const salvarSenha =
        document.getElementById("salvarSenha");

const cancelarSenha =
        document.getElementById("cancelarSenha");

const nomeUsuario =
        document.getElementById("nomeUsuario");

const emailPerfil =
        document.getElementById("emailPerfil");

const mensagemPerfil =
        document.getElementById("mensagemPerfil");

const senhaAtual =
        document.getElementById("senhaAtual");

const novaSenha =
        document.getElementById("novaSenha");

const confirmarSenha =
        document.getElementById("confirmarSenha");

const mensagemSenha =
        document.getElementById("mensagemSenha");


if (botaoEditarPerfil) {

    botaoEditarPerfil.addEventListener(
            "click",
            function () {

                formularioSenha.classList.remove(
                        "aberto"
                        );

                formularioEditar.classList.toggle(
                        "aberto"
                        );

            }
    );

}

if (cancelarEdicao) {

    cancelarEdicao.addEventListener(
            "click",
            function () {

                formularioEditar.classList.remove(
                        "aberto"
                        );

                mensagemPerfil.textContent = "";

            }
    );

}

async function salvarDadosPerfil() {

    const nome =
            nomeUsuario.value.trim();

    const email =
            emailPerfil.value.trim();


    if (
            nome === "" ||
            email === ""
            ) {

        mensagemPerfil.textContent =
                "Preencha todos os campos.";

        mensagemPerfil.style.color =
                "#c45d7d";

        return;
    }


    try {

        const resposta =
                await fetch(
                        "/perfil/atualizar",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                        "application/x-www-form-urlencoded",
                            },

                            body:
                                    new URLSearchParams({

                                        id: "1",

                                        nome: nome,

                                        email: email,

                                    }),

                        }
                );


        if (!resposta.ok) {

            mensagemPerfil.textContent =
                    "Não foi possível salvar as alterações.";

            mensagemPerfil.style.color =
                    "#c45d7d";

            return;
        }


        const dados =
                await resposta.json();


        if (dados.sucesso) {


            if (nomePerfil) {

                nomePerfil.textContent =
                        nome;
            }


            if (nomeExibicao) {

                nomeExibicao.textContent =
                        nome;
            }


            if (emailExibicao) {

                emailExibicao.textContent =
                        email;
            }


            if (avatarPerfil) {

                avatarPerfil.textContent =
                        nome
                        .charAt(0)
                        .toUpperCase();
            }


            mensagemPerfil.textContent =
                    dados.mensagem;

            mensagemPerfil.style.color =
                    "#6c8f72";


            setTimeout(
                    function () {

                        formularioEditar.classList.remove(
                                "aberto"
                                );

                        mensagemPerfil.textContent = "";

                    },
                    1200
                    );


        } else {

            mensagemPerfil.textContent =
                    dados.mensagem ||
                    "Não foi possível salvar.";

            mensagemPerfil.style.color =
                    "#c45d7d";

        }


    } catch (erro) {

        console.error(
                "Erro ao atualizar perfil:",
                erro
                );


        mensagemPerfil.textContent =
                "Erro ao conectar com o servidor.";

        mensagemPerfil.style.color =
                "#c45d7d";

    }

}


if (salvarPerfil) {

    salvarPerfil.addEventListener(
            "click",
            salvarDadosPerfil
            );

}

if (botaoAlterarSenha) {

    botaoAlterarSenha.addEventListener(
            "click",
            function () {

                formularioEditar.classList.remove(
                        "aberto"
                        );

                formularioSenha.classList.toggle(
                        "aberto"
                        );

            }
    );

}


if (cancelarSenha) {

    cancelarSenha.addEventListener(
            "click",
            function () {

                formularioSenha.classList.remove(
                        "aberto"
                        );

                senhaAtual.value = "";

                novaSenha.value = "";

                confirmarSenha.value = "";

                mensagemSenha.textContent = "";

            }
    );

}

if (salvarSenha) {

    salvarSenha.addEventListener(
            "click",
            function () {

                const atual =
                        senhaAtual.value.trim();

                const nova =
                        novaSenha.value.trim();

                const confirmacao =
                        confirmarSenha.value.trim();


                if (
                        atual === "" ||
                        nova === "" ||
                        confirmacao === ""
                        ) {

                    mensagemSenha.textContent =
                            "Preencha todos os campos.";

                    mensagemSenha.style.color =
                            "#c45d7d";

                    return;
                }


                if (nova !== confirmacao) {

                    mensagemSenha.textContent =
                            "As novas senhas não coincidem.";

                    mensagemSenha.style.color =
                            "#c45d7d";

                    return;
                }


                localStorage.setItem(
                        "senhaUsuario",
                        nova
                        );


                mensagemSenha.textContent =
                        "Senha alterada com sucesso!";

                mensagemSenha.style.color =
                        "#6c8f72";


                senhaAtual.value = "";

                novaSenha.value = "";

                confirmarSenha.value = "";


                setTimeout(
                        function () {

                            formularioSenha.classList.remove(
                                    "aberto"
                                    );

                            mensagemSenha.textContent = "";

                        },
                        1200
                        );

            }
    );

}

const modalPerfilAvaliacao =
        document.getElementById(
                "modalPerfilAvaliacao"
                );

const fecharModalPerfil =
        document.getElementById(
                "fecharModalPerfil"
                );

const cancelarModalPerfil =
        document.getElementById(
                "cancelarModalPerfil"
                );

const salvarModalPerfil =
        document.getElementById(
                "salvarModalPerfil"
                );

const nomeDramaEdicao =
        document.getElementById(
                "nomeDramaEdicao"
                );

const resenhaModalPerfil =
        document.getElementById(
                "resenhaModalPerfil"
                );

const notaModalPerfil =
        document.getElementById(
                "notaModalPerfil"
                );

const mensagemModalPerfil =
        document.getElementById(
                "mensagemModalPerfil"
                );

const estrelasModalPerfil =
        document.querySelectorAll(
                ".estrela-modal-perfil"
                );


let idAvaliacaoAtual =
        null;

let idDramaAtual =
        null;

let notaAtual =
        0;

function atualizarEstrelasModal() {

    estrelasModalPerfil.forEach(
            function (estrela) {

                const nota =
                        Number(
                                estrela.dataset.nota
                                );


                if (nota <= notaAtual) {

                    estrela.classList.add(
                            "selecionada"
                            );

                } else {

                    estrela.classList.remove(
                            "selecionada"
                            );

                }

            }
    );


    if (notaAtual > 0) {

        notaModalPerfil.textContent =
                "Nota selecionada: " +
                notaAtual +
                "/5";

    } else {

        notaModalPerfil.textContent =
                "Selecione uma nota.";

    }

}

estrelasModalPerfil.forEach(
        function (estrela) {

            estrela.addEventListener(
                    "click",
                    function () {

                        notaAtual =
                                Number(
                                        estrela.dataset.nota
                                        );

                        atualizarEstrelasModal();

                    }
            );

        }
);

function abrirModalEdicao(
        card
        ) {

    idAvaliacaoAtual =
            card.dataset.idAvaliacao;

    idDramaAtual =
            card.dataset.idDrama;


    const nota =
            Number(
                    card.dataset.nota
                    );


    const resenha =
            card.dataset.resenha;


    const titulo =
            card
            .querySelector(
                    ".info-minha-avaliacao h3"
                    )
            .textContent
            .trim();


    notaAtual =
            nota;


    nomeDramaEdicao.textContent =
            titulo;


    resenhaModalPerfil.value =
            resenha === "null"
            ? ""
            : resenha || "";


    mensagemModalPerfil.textContent =
            "";


    mensagemModalPerfil.style.color =
            "";


    atualizarEstrelasModal();


    modalPerfilAvaliacao.classList.add(
            "ativo"
            );


    document.body.classList.add(
            "modal-perfil-aberto"
            );

}

function fecharModalEdicao() {

    modalPerfilAvaliacao.classList.remove(
            "ativo"
            );


    document.body.classList.remove(
            "modal-perfil-aberto"
            );


    idAvaliacaoAtual =
            null;

    idDramaAtual =
            null;

    notaAtual =
            0;


    resenhaModalPerfil.value =
            "";

    mensagemModalPerfil.textContent =
            "";


    atualizarEstrelasModal();

}

const botoesEditarAvaliacao =
        document.querySelectorAll(
                ".botao-editar-avaliacao"
                );


botoesEditarAvaliacao.forEach(
        function (botao) {

            botao.addEventListener(
                    "click",
                    function () {

                        const card =
                                botao.closest(
                                        ".card-minha-avaliacao"
                                        );


                        if (card) {

                            abrirModalEdicao(
                                    card
                                    );

                        }

                    }
            );

        }
);

if (fecharModalPerfil) {

    fecharModalPerfil.addEventListener(
            "click",
            fecharModalEdicao
            );

}

if (cancelarModalPerfil) {

    cancelarModalPerfil.addEventListener(
            "click",
            fecharModalEdicao
            );

}

if (modalPerfilAvaliacao) {

    modalPerfilAvaliacao.addEventListener(
            "click",
            function (evento) {

                if (
                        evento.target ===
                        modalPerfilAvaliacao
                        ) {

                    fecharModalEdicao();

                }

            }
    );

}

if (salvarModalPerfil) {

    salvarModalPerfil.addEventListener(
            "click",
            async function () {


                if (
                        !idDramaAtual ||
                        notaAtual < 1 ||
                        notaAtual > 5
                        ) {

                    mensagemModalPerfil.textContent =
                            "Selecione uma nota entre 1 e 5.";

                    mensagemModalPerfil.style.color =
                            "#c45d7d";

                    return;
                }


                salvarModalPerfil.disabled =
                        true;


                mensagemModalPerfil.textContent =
                        "Salvando...";

                mensagemModalPerfil.style.color =
                        "#78839a";


                try {

                    const resposta =
                            await fetch(
                                    "/avaliacoes/salvar",
                                    {

                                        method: "POST",

                                        headers: {
                                            "Content-Type":
                                                    "application/x-www-form-urlencoded",
                                        },

                                        body:
                                                new URLSearchParams({

                                                    idDrama:
                                                            idDramaAtual,

                                                    nota:
                                                            notaAtual,

                                                    resenha:
                                                            resenhaModalPerfil.value.trim(),

                                                }),

                                    }
                            );


                    if (!resposta.ok) {

                        mensagemModalPerfil.textContent =
                                "Não foi possível salvar a avaliação.";

                        mensagemModalPerfil.style.color =
                                "#c45d7d";

                        salvarModalPerfil.disabled =
                                false;

                        return;
                    }


                    const dados =
                            await resposta.json();


                    if (dados.sucesso) {

                        mensagemModalPerfil.textContent =
                                "Avaliação atualizada com sucesso!";

                        mensagemModalPerfil.style.color =
                                "#6c8f72";


                        setTimeout(
                                function () {

                                    window.location.reload();

                                },
                                700
                                );


                    } else {

                        mensagemModalPerfil.textContent =
                                dados.mensagem ||
                                "Não foi possível salvar.";

                        mensagemModalPerfil.style.color =
                                "#c45d7d";

                        salvarModalPerfil.disabled =
                                false;

                    }


                } catch (erro) {

                    console.error(
                            "Erro ao atualizar avaliação:",
                            erro
                            );


                    mensagemModalPerfil.textContent =
                            "Erro ao conectar com o servidor.";

                    mensagemModalPerfil.style.color =
                            "#c45d7d";


                    salvarModalPerfil.disabled =
                            false;

                }

            }
    );

}

const botoesExcluirAvaliacao =
        document.querySelectorAll(
                ".botao-excluir-avaliacao"
                );


botoesExcluirAvaliacao.forEach(
        function (botao) {

            botao.addEventListener(
                    "click",
                    async function () {

                        const card =
                                botao.closest(
                                        ".card-minha-avaliacao"
                                        );


                        if (!card) {

                            return;
                        }


                        const idAvaliacao =
                                card.dataset.idAvaliacao;


                        const titulo =
                                card
                                .querySelector(
                                        ".info-minha-avaliacao h3"
                                        )
                                .textContent
                                .trim();


                        const confirmar =
                                window.confirm(
                                        "Deseja realmente excluir sua avaliação de \"" +
                                        titulo +
                                        "\"?"
                                        );


                        if (!confirmar) {

                            return;
                        }


                        botao.disabled =
                                true;


                        try {

                            const resposta =
                                    await fetch(
                                            "/avaliacoes/excluir",
                                            {

                                                method: "POST",

                                                headers: {
                                                    "Content-Type":
                                                            "application/x-www-form-urlencoded",
                                                },

                                                body:
                                                        new URLSearchParams({

                                                            idAvaliacao:
                                                                    idAvaliacao,

                                                        }),

                                            }
                                    );


                            if (!resposta.ok) {

                                alert(
                                        "Não foi possível excluir a avaliação."
                                        );

                                botao.disabled =
                                        false;

                                return;
                            }


                            const dados =
                                    await resposta.json();


                            if (dados.sucesso) {

                                window.location.reload();

                            } else {

                                alert(
                                        dados.mensagem ||
                                        "Não foi possível excluir a avaliação."
                                        );

                                botao.disabled =
                                        false;

                            }


                        } catch (erro) {

                            console.error(
                                    "Erro ao excluir avaliação:",
                                    erro
                                    );


                            alert(
                                    "Erro ao conectar com o servidor."
                                    );


                            botao.disabled =
                                    false;

                        }

                    }
            );

        }
);