package DramaList.controller;

import DramaList.model.Avaliacao;
import DramaList.model.Drama;
import DramaList.model.Usuario;
import DramaList.service.AvaliacaoService;
import DramaList.service.DramaService;
import DramaList.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AvaliacaoController {

    private static final Integer USUARIO_PADRAO = 1;

    private final AvaliacaoService avaliacaoService;
    private final DramaService dramaService;
    private final UsuarioService usuarioService;

    public AvaliacaoController(
            AvaliacaoService avaliacaoService,
            DramaService dramaService,
            UsuarioService usuarioService) {

        this.avaliacaoService
                = avaliacaoService;

        this.dramaService
                = dramaService;

        this.usuarioService
                = usuarioService;
    }

    @PostMapping("/avaliacoes/salvar")
    @ResponseBody
    public Map<String, Object> salvar(
            @RequestParam Integer idDrama,
            @RequestParam Integer nota,
            @RequestParam(required = false) String resenha) {

        Map<String, Object> resposta
                = new HashMap<>();

        if (nota < 1 || nota > 5) {

            resposta.put(
                    "sucesso",
                    false
            );

            resposta.put(
                    "mensagem",
                    "A nota deve estar entre 1 e 5."
            );

            return resposta;
        }

        Optional<Usuario> usuarioOptional
                = usuarioService.buscarPorId(
                        USUARIO_PADRAO
                );

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

        Optional<Drama> dramaOptional
                = dramaService.buscarPorId(idDrama);

        if (dramaOptional.isEmpty()) {

            resposta.put(
                    "sucesso",
                    false
            );

            resposta.put(
                    "mensagem",
                    "Drama não encontrado."
            );

            return resposta;
        }

        Usuario usuario
                = usuarioOptional.get();

        Drama drama
                = dramaOptional.get();

        Optional<Avaliacao> avaliacaoExistente
                = avaliacaoService
                        .buscarPorUsuarioEDrama(
                                USUARIO_PADRAO,
                                idDrama
                        );

        Avaliacao avaliacao;

        if (avaliacaoExistente.isPresent()) {

            avaliacao
                    = avaliacaoExistente.get();

        } else {

            avaliacao
                    = new Avaliacao();

            avaliacao.setUsuario(usuario);

            avaliacao.setDrama(drama);
        }

        avaliacao.setNota(nota);

        avaliacao.setResenha(resenha);

        avaliacaoService.salvar(
                avaliacao
        );

        resposta.put(
                "sucesso",
                true
        );

        resposta.put(
                "mensagem",
                "Avaliação salva com sucesso!"
        );

        resposta.put(
                "nota",
                nota
        );

        resposta.put(
                "resenha",
                resenha
        );

        return resposta;
    }

    @PostMapping("/avaliacoes/excluir")
    @ResponseBody
    public Map<String, Object> excluir(
            @RequestParam Integer idAvaliacao) {

        Map<String, Object> resposta
                = new HashMap<>();

        Optional<Avaliacao> avaliacaoOptional
                = avaliacaoService
                        .buscarPorId(idAvaliacao);

        if (avaliacaoOptional.isEmpty()) {

            resposta.put(
                    "sucesso",
                    false
            );

            resposta.put(
                    "mensagem",
                    "Avaliação não encontrada."
            );

            return resposta;
        }

        Avaliacao avaliacao
                = avaliacaoOptional.get();

        if (avaliacao.getUsuario() == null
                || !USUARIO_PADRAO.equals(
                        avaliacao
                                .getUsuario()
                                .getIdUsuario()
                )) {

            resposta.put(
                    "sucesso",
                    false
            );

            resposta.put(
                    "mensagem",
                    "Você não pode excluir esta avaliação."
            );

            return resposta;
        }

        avaliacaoService.excluir(
                idAvaliacao
        );

        resposta.put(
                "sucesso",
                true
        );

        resposta.put(
                "mensagem",
                "Avaliação excluída com sucesso!"
        );

        return resposta;
    }
}
