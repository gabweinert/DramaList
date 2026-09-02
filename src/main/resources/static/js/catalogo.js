const pesquisa = document.getElementById("pesquisaCatalogo");

const filtros = document.querySelectorAll(".filtro");

const cards = document.querySelectorAll(".card-catalogo");

const semResultados = document.getElementById("nenhumResultado");

let generoAtual = "todos";

function filtrarDramas() {
  const textoPesquisa = pesquisa.value.toLowerCase().trim();

  let quantidadeVisivel = 0;

  cards.forEach(function (card) {
    const titulo = card.querySelector("h2").textContent.toLowerCase();

    const generos = card.dataset.generos.toLowerCase();

    const correspondePesquisa = titulo.includes(textoPesquisa);

    const correspondeGenero =
      generoAtual === "todos" || generos.includes(generoAtual);

    if (correspondePesquisa && correspondeGenero) {
      card.style.display = "block";

      quantidadeVisivel++;
    } else {
      card.style.display = "none";
    }
  });

  if (quantidadeVisivel === 0) {
    semResultados.style.display = "block";
  } else {
    semResultados.style.display = "none";
  }
}

pesquisa.addEventListener("input", filtrarDramas);

filtros.forEach(function (filtro) {
  filtro.addEventListener("click", function () {
    filtros.forEach(function (outroFiltro) {
      outroFiltro.classList.remove("ativo");
    });

    filtro.classList.add("ativo");

    generoAtual = filtro.dataset.genero.toLowerCase();

    filtrarDramas();
  });
});

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    const drama = card.dataset.drama;

    window.location.href = `/drama/${drama}`;
  });
});

cards.forEach(function (card) {
  card.style.cursor = "pointer";
});

filtrarDramas();