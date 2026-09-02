package DramaList.controller;

import DramaList.model.Avaliacao;
import DramaList.model.MinhaLista;
import DramaList.model.Usuario;
import DramaList.service.AvaliacaoService;
import DramaList.service.MinhaListaService;
import DramaList.service.UsuarioService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PerfilController {

    private static final Integer USUARIO_PADRAO = 1;

    private final UsuarioService usuarioService;
    private final MinhaListaService minhaListaService;
    private final AvaliacaoService avaliacaoService;

    public PerfilController(
            UsuarioService usuarioService,
            MinhaListaService minhaListaService,
            AvaliacaoService avaliacaoService) {

        this.usuarioService = usuarioService;

        this.minhaListaService = minhaListaService;

        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("/perfil")
    public String perfil(Model model) {

        Optional<Usuario> usuario
                = usuarioService.buscarPorId(
                        USUARIO_PADRAO
                );

        if (usuario.isEmpty()) {

            return "redirect:/";
        }

        model.addAttribute(
                "usuario",
                usuario.get()
        );

        List<MinhaLista> lista
                = minhaListaService.listarPorUsuario(
                        USUARIO_PADRAO
                );

        int queroAssistir = 0;

        int assistindo = 0;

        int concluidos = 0;

        for (MinhaLista item : lista) {

            String status
                    = item.getStatus();

            if ("Quero assistir".equals(status)) {

                queroAssistir++;

            } else if ("Assistindo".equals(status)) {

                assistindo++;

            } else if ("Concluído".equals(status)) {

                concluidos++;
            }
        }

        model.addAttribute(
                "totalQueroAssistir",
                queroAssistir
        );

        model.addAttribute(
                "totalAssistindo",
                assistindo
        );

        model.addAttribute(
                "totalConcluidos",
                concluidos
        );

        model.addAttribute(
                "totalDramas",
                lista.size()
        );

        List<Avaliacao> minhasAvaliacoes
                = avaliacaoService.listarPorUsuario(
                        USUARIO_PADRAO
                );

        model.addAttribute(
                "minhasAvaliacoes",
                minhasAvaliacoes
        );

        return "perfil";
    }

    @PostMapping("/perfil/atualizar")
    @ResponseBody
    public Map<String, Object> atualizarPerfil(
            @RequestParam Integer id,
            @RequestParam String nome,
            @RequestParam String email) {

        Map<String, Object> resposta
                = new HashMap<>();

        Optional<Usuario> usuarioOptional
                = usuarioService.buscarPorId(id);

        if (usuarioOptional.isEmpty()) {

            resposta.put(
                    "sucesso",
                    false
            );

            resposta.put(
                    "mensagem",
                    "Usuário não encontrado."
            );

            return resposta;
        }

        Usuario usuario
                = usuarioOptional.get();

        usuario.setNome(nome);

        usuario.setEmail(email);

        usuarioService.salvar(
                usuario
        );

        resposta.put(
                "sucesso",
                true
        );

        resposta.put(
                "mensagem",
                "Dados atualizados com sucesso!"
        );

        return resposta;
    }
}
