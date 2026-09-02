const pesquisa = document.getElementById("pesquisaLista");

const filtros = document.querySelectorAll(".filtro-lista");

const cards = document.querySelectorAll(".card-lista");

const nenhumResultado = document.getElementById("nenhumResultado");

let filtroAtual = "todos";

function filtrarDramas() {

    const textoPesquisa =
            pesquisa.value.toLowerCase().trim();

    let quantidadeVisivel = 0;


    cards.forEach(function (card) {

        const titulo =
                card.querySelector("h2")
                .textContent
                .toLowerCase();


        const select =
                card.querySelector(".status-select");


        const status =
                select.value.toLowerCase();


        const correspondePesquisa =
                titulo.includes(textoPesquisa);


        const correspondeFiltro =
                filtroAtual === "todos" ||
                status === filtroAtual;


        if (
                correspondePesquisa &&
                correspondeFiltro
                ) {

            card.style.display = "";

            quantidadeVisivel++;

        } else {

            card.style.display = "none";

        }

    });


    if (quantidadeVisivel === 0) {

        nenhumResultado.style.display = "block";

    } else {

        nenhumResultado.style.display = "none";

    }
}

if (pesquisa) {

    pesquisa.addEventListener(
            "input",
            filtrarDramas
            );

}


filtros.forEach(function (filtro) {

    filtro.addEventListener(
            "click",
            function () {

                filtros.forEach(
                        function (outroFiltro) {

                            outroFiltro.classList.remove(
                                    "ativo"
                                    );

                        }
                );


                filtro.classList.add("ativo");


                filtroAtual =
                        filtro.dataset.filtro
                        .toLowerCase();


                filtrarDramas();

            }
    );

});


const selectsStatus =
        document.querySelectorAll(".status-select");


selectsStatus.forEach(function (select) {

    select.addEventListener(
            "change",
            function () {

                const idMinhaLista =
                        select.dataset.id;

                const status =
                        select.value;


                fetch(
                        `/minha-lista/status/${idMinhaLista}`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                        "application/x-www-form-urlencoded"
                            },

                            body:
                                    `status=${encodeURIComponent(status)}`
                        }
                )

                        .then(function (resposta) {

                            if (!resposta.ok) {

                                throw new Error(
                                        "Erro ao atualizar o status."
                                        );

                            }

                            return resposta.text();

                        })

                        .then(function () {

                            filtrarDramas();

                        })

                        .catch(function (erro) {

                            console.error(
                                    "Erro ao atualizar status:",
                                    erro
                                    );

                        });

            }
    );

});

filtrarDramas();