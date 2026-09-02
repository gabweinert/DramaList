package DramaList.controller;

import DramaList.model.Usuario;
import DramaList.service.UsuarioService;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

    private static final Integer USUARIO_PADRAO = 1;

    private final UsuarioService usuarioService;

    public GlobalControllerAdvice(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @ModelAttribute("usuario")
    public Usuario usuarioLogado() {

        return usuarioService
                .buscarPorId(USUARIO_PADRAO)
                .orElse(null);
    }
}
