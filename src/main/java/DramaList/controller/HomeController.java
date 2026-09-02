package DramaList.controller;

import DramaList.model.Drama;
import DramaList.service.DramaService;
import DramaList.service.AvaliacaoService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    private final DramaService dramaService;
    private final AvaliacaoService avaliacaoService;

    public HomeController(
            DramaService dramaService,
            AvaliacaoService avaliacaoService) {

        this.dramaService = dramaService;
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("/")
    public String home(Model model) {

        List<Drama> dramas
                = dramaService.listarTodos();

        Map<Integer, Double> medias
                = new HashMap<>();

        for (Drama drama : dramas) {

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
                "medias",
                medias
        );

        return "index";
    }
}
