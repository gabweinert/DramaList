package DramaList.controller;

import DramaList.model.Drama;
import DramaList.model.MinhaLista;
import DramaList.model.Usuario;
import DramaList.service.AvaliacaoService;
import DramaList.service.DramaService;
import DramaList.service.MinhaListaService;
import DramaList.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MinhaListaController {

    private static final Integer USUARIO_PADRAO = 1;

    private final MinhaListaService minhaListaService;
    private final DramaService dramaService;
    private final UsuarioService usuarioService;
    private final AvaliacaoService avaliacaoService;

    public MinhaListaController(
            MinhaListaService minhaListaService,
            DramaService dramaService,
            UsuarioService usuarioService,
            AvaliacaoService avaliacaoService) {

        this.minhaListaService = minhaListaService;
        this.dramaService = dramaService;
        this.usuarioService = usuarioService;
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("/minha-lista")
    public String minhaLista(Model model) {

        var minhaLista = minhaListaService
                .listarPorUsuario(USUARIO_PADRAO);

        Map<Integer, String> imagens = new HashMap<>();

        Map<Integer, Double> avaliacoes = new HashMap<>();

        for (MinhaLista item : minhaLista) {

            Drama drama = item.getDrama();

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

            Double media = avaliacaoService
                    .calcularMediaPorDrama(drama.getIdDrama());

            avaliacoes.put(
                    drama.getIdDrama(),
                    media
            );
        }

        System.out.println("=================================");
        System.out.println("USUARIO: " + USUARIO_PADRAO);
        System.out.println("ITENS NA MINHA LISTA: " + minhaLista.size());
        System.out.println("=================================");

        model.addAttribute("minhaLista", minhaLista);

        model.addAttribute("imagens", imagens);

        model.addAttribute("avaliacoes", avaliacoes);

        return "minha-lista";
    }

    @PostMapping("/minha-lista/adicionar/{idDrama}")
    public String adicionar(@PathVariable Integer idDrama) {

        if (!minhaListaService.verificarSeExiste(
                USUARIO_PADRAO,
                idDrama)) {

            Usuario usuario = usuarioService
                    .buscarPorId(USUARIO_PADRAO)
                    .orElse(null);

            Drama drama = dramaService
                    .buscarPorId(idDrama)
                    .orElse(null);

            if (usuario != null && drama != null) {

                MinhaLista item = new MinhaLista(
                        usuario,
                        drama
                );

                minhaListaService.salvar(item);
            }
        }

        return "redirect:/drama/" + idDrama;
    }

    @PostMapping("/minha-lista/remover/{idDrama}")
    public String remover(@PathVariable Integer idDrama) {

        minhaListaService.remover(
                USUARIO_PADRAO,
                idDrama
        );

        return "redirect:/minha-lista";
    }

    @PostMapping("/minha-lista/status/{idMinhaLista}")
    @ResponseBody
    public String atualizarStatus(
            @PathVariable Integer idMinhaLista,
            @RequestParam String status) {

        minhaListaService.atualizarStatus(
                idMinhaLista,
                status
        );

        return "ok";
    }
}
