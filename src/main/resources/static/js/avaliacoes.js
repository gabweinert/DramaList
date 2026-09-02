const listaAvaliacoes =
        document.querySelector(".lista-avaliacoes");

const setaEsquerda =
        document.getElementById("setaAvaliacaoEsquerda");

const setaDireita =
        document.getElementById("setaAvaliacaoDireita");


if (
        listaAvaliacoes &&
        setaEsquerda &&
        setaDireita
        ) {

    function atualizarSetas() {

        const chegouInicio =
                listaAvaliacoes.scrollLeft <= 5;

        const chegouFim =
                listaAvaliacoes.scrollLeft +
                listaAvaliacoes.clientWidth >=
                listaAvaliacoes.scrollWidth - 5;


        setaEsquerda.disabled =
                chegouInicio;

        setaDireita.disabled =
                chegouFim;

    }


    function moverParaDireita() {

        const card =
                listaAvaliacoes.querySelector(
                        ".card-avaliacao"
                        );


        if (!card) {
            return;
        }


        const larguraCard =
                card.offsetWidth;

        const espaco = 16;


        listaAvaliacoes.scrollBy({

            left:
                    larguraCard + espaco,

            behavior:
                    "smooth"

        });

    }


    function moverParaEsquerda() {

        const card =
                listaAvaliacoes.querySelector(
                        ".card-avaliacao"
                        );


        if (!card) {
            return;
        }


        const larguraCard =
                card.offsetWidth;

        const espaco = 16;


        listaAvaliacoes.scrollBy({

            left:
                    -(larguraCard + espaco),

            behavior:
                    "smooth"

        });

    }


    setaDireita.addEventListener(
            "click",
            function () {

                moverParaDireita();

            }
    );


    setaEsquerda.addEventListener(
            "click",
            function () {

                moverParaEsquerda();

            }
    );


    listaAvaliacoes.addEventListener(
            "scroll",
            function () {

                atualizarSetas();

            }
    );


    window.addEventListener(
            "resize",
            function () {

                atualizarSetas();

            }
    );


    atualizarSetas();

}

const botaoAvaliar =
        document.getElementById("botaoAvaliar");

const botaoVisualizar =
        document.getElementById(
                "botaoVisualizarAvaliacao"
                );

const modalAvaliacao =
        document.getElementById(
                "modalAvaliacao"
                );

const fecharModal =
        document.getElementById(
                "fecharModalAvaliacao"
                );

const cancelarAvaliacao =
        document.getElementById(
                "cancelarAvaliacao"
                );

const salvarAvaliacao =
        document.getElementById(
                "salvarAvaliacao"
                );

const resenhaAvaliacao =
        document.getElementById(
                "resenhaAvaliacao"
                );

const mensagemAvaliacao =
        document.getElementById(
                "mensagemAvaliacao"
                );

const notaSelecionada =
        document.getElementById(
                "notaSelecionada"
                );

const estrelas =
        document.querySelectorAll(
                ".estrela-avaliacao"
                );

const dadosMinhaAvaliacao =
        document.getElementById(
                "dadosMinhaAvaliacao"
                );



let notaAtual = 0;

const areaAvaliacao =
        document.querySelector(
                ".acao-avaliacao"
                );


const idDrama =
        areaAvaliacao
        ? areaAvaliacao.dataset.idDrama
        : null;

function abrirModalAvaliacao() {

    if (!modalAvaliacao) {
        return;
    }


    modalAvaliacao.classList.add(
            "ativo"
            );

    modalAvaliacao.setAttribute(
            "aria-hidden",
            "false"
            );


    document.body.classList.add(
            "modal-aberto"
            );

}

function fecharModalAvaliacao() {

    if (!modalAvaliacao) {
        return;
    }


    modalAvaliacao.classList.remove(
            "ativo"
            );

    modalAvaliacao.setAttribute(
            "aria-hidden",
            "true"
            );


    document.body.classList.remove(
            "modal-aberto"
            );


    limparMensagem();

}

function limparMensagem() {

    if (!mensagemAvaliacao) {
        return;
    }


    mensagemAvaliacao.textContent = "";

    mensagemAvaliacao.className =
            "mensagem-avaliacao";

}

function mostrarMensagem(
        mensagem,
        sucesso
        ) {

    if (!mensagemAvaliacao) {
        return;
    }


    mensagemAvaliacao.textContent =
            mensagem;


    mensagemAvaliacao.className =
            sucesso
            ? "mensagem-avaliacao sucesso"
            : "mensagem-avaliacao erro";

}

function atualizarEstrelas(
        nota
        ) {

    estrelas.forEach(
            function (estrela) {

                const valor =
                        Number(
                                estrela.dataset.nota
                                );


                estrela.classList.toggle(
                        "selecionada",
                        valor <= nota
                        );

            }
    );


    if (notaSelecionada) {

        if (nota > 0) {

            notaSelecionada.textContent =
                    nota +
                    (
                            nota === 1
                            ? " estrela"
                            : " estrelas"
                            );

        } else {

            notaSelecionada.textContent =
                    "Selecione uma nota";

        }

    }

}

estrelas.forEach(
        function (estrela) {

            estrela.addEventListener(
                    "click",
                    function () {

                        notaAtual =
                                Number(
                                        estrela.dataset.nota
                                        );


                        atualizarEstrelas(
                                notaAtual
                                );

                    }
            );



            estrela.addEventListener(
                    "mouseenter",
                    function () {

                        const notaHover =
                                Number(
                                        estrela.dataset.nota
                                        );


                        atualizarEstrelas(
                                notaHover
                                );

                    }
            );

        }
);

const selecaoEstrelas =
        document.getElementById(
                "selecaoEstrelas"
                );


if (selecaoEstrelas) {

    selecaoEstrelas.addEventListener(
            "mouseleave",
            function () {

                atualizarEstrelas(
                        notaAtual
                        );

            }
    );

}

function carregarMinhaAvaliacao() {

    if (
            !dadosMinhaAvaliacao
            ) {

        notaAtual = 0;

        atualizarEstrelas(
                0
                );

        if (resenhaAvaliacao) {

            resenhaAvaliacao.value =
                    "";

        }

        return;

    }


    const nota =
            Number(
                    dadosMinhaAvaliacao.dataset.nota
                    );


    const resenha =
            dadosMinhaAvaliacao.dataset.resenha;


    notaAtual =
            nota || 0;


    atualizarEstrelas(
            notaAtual
            );


    if (resenhaAvaliacao) {

        resenhaAvaliacao.value =
                resenha === "null"
                ? ""
                : (resenha || "");

    }

}

if (botaoAvaliar) {

    botaoAvaliar.addEventListener(
            "click",
            function () {

                notaAtual = 0;

                atualizarEstrelas(
                        0
                        );


                if (resenhaAvaliacao) {

                    resenhaAvaliacao.value =
                            "";

                }


                abrirModalAvaliacao();

            }
    );

}

if (botaoVisualizar) {

    botaoVisualizar.addEventListener(
            "click",
            function () {

                carregarMinhaAvaliacao();

                abrirModalAvaliacao();

            }
    );

}

if (fecharModal) {

    fecharModal.addEventListener(
            "click",
            function () {

                fecharModalAvaliacao();

            }
    );

}



if (cancelarAvaliacao) {

    cancelarAvaliacao.addEventListener(
            "click",
            function () {

                fecharModalAvaliacao();

            }
    );

}

if (modalAvaliacao) {

    modalAvaliacao.addEventListener(
            "click",
            function (evento) {

                if (
                        evento.target ===
                        modalAvaliacao
                        ) {

                    fecharModalAvaliacao();

                }

            }
    );

}

document.addEventListener(
        "keydown",
        function (evento) {

            if (
                    evento.key === "Escape" &&
                    modalAvaliacao &&
                    modalAvaliacao.classList.contains(
                            "ativo"
                            )
                    ) {

                fecharModalAvaliacao();

            }

        }
);

if (salvarAvaliacao) {

    salvarAvaliacao.addEventListener(
            "click",
            async function () {


                if (
                        notaAtual < 1 ||
                        notaAtual > 5
                        ) {

                    mostrarMensagem(
                            "Selecione uma nota de 1 a 5 estrelas.",
                            false
                            );

                    return;

                }

                if (!idDrama) {

                    mostrarMensagem(
                            "Não foi possível identificar o drama.",
                            false
                            );

                    return;

                }


                const resenha =
                        resenhaAvaliacao
                        ? resenhaAvaliacao.value.trim()
                        : "";


                salvarAvaliacao.disabled =
                        true;

                salvarAvaliacao.textContent =
                        "Salvando...";


                limparMensagem();


                try {


                    const resposta =
                            await fetch(
                                    "/avaliacoes/salvar",
                                    {

                                        method:
                                                "POST",

                                        headers: {

                                            "Content-Type":
                                                    "application/x-www-form-urlencoded;charset=UTF-8"

                                        },

                                        body:
                                                new URLSearchParams({

                                                    idDrama:
                                                            idDrama,

                                                    nota:
                                                            notaAtual,

                                                    resenha:
                                                            resenha

                                                })

                                    }
                            );


                    const dados =
                            await resposta.json();


                    if (
                            !resposta.ok ||
                            !dados.sucesso
                            ) {

                        throw new Error(
                                dados.mensagem ||
                                "Não foi possível salvar a avaliação."
                                );

                    }

                    mostrarMensagem(
                            "Avaliação salva com sucesso!",
                            true
                            );


                    setTimeout(
                            function () {

                                window.location.reload();

                            },
                            700
                            );


                } catch (erro) {

                    console.error(
                            "Erro ao salvar avaliação:",
                            erro
                            );


                    mostrarMensagem(
                            erro.message ||
                            "Não foi possível salvar a avaliação.",
                            false
                            );


                    salvarAvaliacao.disabled =
                            false;

                    salvarAvaliacao.textContent =
                            "💾 Salvar avaliação";

                }

            }
    );

}