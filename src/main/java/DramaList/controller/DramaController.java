package DramaList.controller;

import DramaList.model.Avaliacao;
import DramaList.model.Drama;
import DramaList.service.AvaliacaoService;
import DramaList.service.DramaService;
import DramaList.service.MinhaListaService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class DramaController {

    private final DramaService dramaService;
    private final AvaliacaoService avaliacaoService;
    private final MinhaListaService minhaListaService;

    private static final Integer USUARIO_PADRAO = 1;

    public DramaController(
            DramaService dramaService,
            AvaliacaoService avaliacaoService,
            MinhaListaService minhaListaService) {

        this.dramaService = dramaService;
        this.avaliacaoService = avaliacaoService;
        this.minhaListaService = minhaListaService;
    }

    @GetMapping("/catalogo")
    public String catalogo(Model model) {

        List<Drama> dramas
                = dramaService.listarTodos();

        Map<Integer, String> imagens
                = new HashMap<>();

        Map<Integer, String> generos
                = new HashMap<>();

        Map<Integer, Double> medias
                = new HashMap<>();

        for (Drama drama : dramas) {

            switch (drama.getTitulo()) {

                case "Alchemy of Souls" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Alchemy-of-Souls.jpg"
                    );

                case "Business Proposal" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Business-Proposal.jpg"
                    );

                case "Crash Landing on You" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Crash-Landing-on-You.jpg"
                    );

                case "Extraordinary Attorney Woo" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Extraordinary-Attorney-Woo.jpg"
                    );

                case "Lovely Runner" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Lovely-Runner.jpg"
                    );

                case "Moving" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Moving.jpg"
                    );

                case "My Demon" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "My-Demon.jpg"
                    );

                case "Queen of Tears" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Queen-of-Tears.jpg"
                    );

                case "True Beauty" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "True-Beauty.jpg"
                    );

                case "Twenty-Five Twenty-One" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "Twenty-Five-Twenty-One.jpg"
                    );

                case "When Life Gives You Tangerines" ->
                    imagens.put(
                            drama.getIdDrama(),
                            "When-Life-Gives-You-Tangerines.jpg"
                    );
            }

            String genero
                    = drama.getGenero().toLowerCase();

            if (genero.contains("romance")) {
                genero = genero + " romance";
            }

            if (genero.contains("comédia")) {
                genero = genero + " comedia";
            }

            if (genero.contains("ação")) {
                genero = genero + " acao";
            }

            if (genero.contains("fantasia")) {
                genero = genero + " fantasia";
            }

            if (genero.contains("drama")) {
                genero = genero + " drama";
            }

            generos.put(
                    drama.getIdDrama(),
                    genero
            );

            Double media
                    = avaliacaoService.calcularMediaPorDrama(
                            drama.getIdDrama()
                    );

            if (media != null) {

                medias.put(
                        drama.getIdDrama(),
                        media
                );
            }
        }

        model.addAttribute(
                "dramas",
                dramas
        );

        model.addAttribute(
                "imagens",
                imagens
        );

        model.addAttribute(
                "generos",
                generos
        );

        model.addAttribute(
                "medias",
                medias
        );

        return "catalogo";
    }

    @GetMapping("/drama/{id}")
    public String detalhes(
            @PathVariable Integer id,
            Model model) {

        Drama drama
                = dramaService.buscarPorId(id)
                        .orElse(null);

        if (drama == null) {

            return "redirect:/catalogo";
        }

        Double media
                = avaliacaoService.calcularMediaPorDrama(
                        id
                );

        List<Avaliacao> avaliacoes
                = avaliacaoService.listarPorDrama(
                        id
                );

        Optional<Avaliacao> minhaAvaliacao
                = avaliacaoService.buscarPorUsuarioEDrama(
                        USUARIO_PADRAO,
                        id
                );

        String imagem = "";

        switch (drama.getTitulo()) {

            case "Alchemy of Souls" ->
                imagem = "Alchemy-of-Souls.jpg";

            case "Business Proposal" ->
                imagem = "Business-Proposal.jpg";

            case "Crash Landing on You" ->
                imagem = "Crash-Landing-on-You.jpg";

            case "Extraordinary Attorney Woo" ->
                imagem = "Extraordinary-Attorney-Woo.jpg";

            case "Lovely Runner" ->
                imagem = "Lovely-Runner.jpg";

            case "Moving" ->
                imagem = "Moving.jpg";

            case "My Demon" ->
                imagem = "My-Demon.jpg";

            case "Queen of Tears" ->
                imagem = "Queen-of-Tears.jpg";

            case "True Beauty" ->
                imagem = "True-Beauty.jpg";

            case "Twenty-Five Twenty-One" ->
                imagem = "Twenty-Five-Twenty-One.jpg";

            case "When Life Gives You Tangerines" ->
                imagem = "When-Life-Gives-You-Tangerines.jpg";
        }

        List<Drama> recomendacoes
                = dramaService.listarRecomendacoes(
                        id
                );

        Map<Integer, Double> mediasRecomendacoes
                = new HashMap<>();

        for (Drama recomendacao : recomendacoes) {

            Double mediaRecomendacao
                    = avaliacaoService.calcularMediaPorDrama(
                            recomendacao.getIdDrama()
                    );

            if (mediaRecomendacao != null) {

                mediasRecomendacoes.put(
                        recomendacao.getIdDrama(),
                        mediaRecomendacao
                );
            }
        }

        boolean estaNaLista
                = minhaListaService.verificarSeExiste(
                        USUARIO_PADRAO,
                        id
                );

        model.addAttribute(
                "drama",
                drama
        );

        model.addAttribute(
                "media",
                media
        );

        model.addAttribute(
                "avaliacoes",
                avaliacoes
        );

        model.addAttribute(
                "minhaAvaliacao",
                minhaAvaliacao.orElse(null)
        );

        model.addAttribute(
                "imagem",
                imagem
        );

        model.addAttribute(
                "recomendacoes",
                recomendacoes
        );

        model.addAttribute(
                "mediasRecomendacoes",
                mediasRecomendacoes
        );

        model.addAttribute(
                "estaNaLista",
                estaNaLista
        );

        return "detalhes";
    }
}
