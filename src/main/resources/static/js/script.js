const listaDestaques = document.getElementById("listaDestaques");

const botaoAnterior = document.getElementById("anterior");

const botaoProximo = document.getElementById("proximo");

const campoPesquisa = document.getElementById("pesquisa");

const larguraCard = 210;

const espacamento = 25;

const distancia = larguraCard + espacamento;

botaoProximo.addEventListener("click", function () {
    const chegouFim =
            listaDestaques.scrollLeft + listaDestaques.clientWidth >=
            listaDestaques.scrollWidth - 2;

    if (chegouFim) {
        listaDestaques.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    } else {
        listaDestaques.scrollBy({
            left: distancia,
            behavior: "smooth",
        });
    }
});


botaoAnterior.addEventListener("click", function () {
    const chegouInicio = listaDestaques.scrollLeft <= 0;

    if (chegouInicio) {
        const ultimaPosicao =
                listaDestaques.scrollWidth - listaDestaques.clientWidth;

        listaDestaques.scrollTo({
            left: ultimaPosicao,
            behavior: "smooth",
        });
    } else {
        listaDestaques.scrollBy({
            left: -distancia,
            behavior: "smooth",
        });
    }
});


const cardsDestaque = document.querySelectorAll(".card-drama");

const idsDramas = {
    "alchemy-of-souls": 1,
    "business-proposal": 2,
    "crash-landing-on-you": 3,
    "extraordinary-attorney-woo": 4,
    "lovely-runner": 5,
    "moving": 6,
    "my-demon": 7,
    "queen-of-tears": 8,
    "true-beauty": 9,
    "twenty-five-twenty-one": 10,
    "when-life-gives-you-tangerines": 11
};


cardsDestaque.forEach(function (card) {

    card.addEventListener("click", function () {

        const drama = card.dataset.drama;

        const idDrama = idsDramas[drama];

        if (idDrama) {

            window.location.href = `/drama/${idDrama}`;

        } else {

            console.error("Drama não encontrado:", drama);

        }

    });

    card.style.cursor = "pointer";

});

if (campoPesquisa) {

    campoPesquisa.addEventListener("input", function () {

        const textoPesquisa =
                campoPesquisa.value.toLowerCase().trim();

        let encontrouDrama = false;


        cardsDestaque.forEach(function (card) {

            const titulo =
                    card.querySelector("h3").textContent.toLowerCase();


            if (
                    textoPesquisa === "" ||
                    titulo.includes(textoPesquisa)
                    ) {

                card.style.display = "";

                encontrouDrama = true;

            } else {

                card.style.display = "none";

            }

        });


        listaDestaques.scrollTo({
            left: 0,
            behavior: "smooth",
        });


        if (textoPesquisa !== "") {

            botaoAnterior.style.display = "none";

            botaoProximo.style.display = "none";

        } else {

            botaoAnterior.style.display = "";

            botaoProximo.style.display = "";

        }

    });

}