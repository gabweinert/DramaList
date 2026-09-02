package DramaList.service;

import DramaList.model.MinhaLista;
import DramaList.repository.MinhaListaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MinhaListaService {

    private final MinhaListaRepository minhaListaRepository;

    public MinhaListaService(MinhaListaRepository minhaListaRepository) {
        this.minhaListaRepository = minhaListaRepository;
    }

    public List<MinhaLista> listarPorUsuario(Integer idUsuario) {
        return minhaListaRepository.findByUsuarioIdUsuario(idUsuario);
    }

    public boolean verificarSeExiste(Integer idUsuario, Integer idDrama) {
        return minhaListaRepository
                .existsByUsuarioIdUsuarioAndDramaIdDrama(
                        idUsuario,
                        idDrama
                );
    }

    public MinhaLista salvar(MinhaLista minhaLista) {
        return minhaListaRepository.save(minhaLista);
    }

    public void remover(Integer idUsuario, Integer idDrama) {

        Optional<MinhaLista> resultado =
                minhaListaRepository.findByUsuarioIdUsuarioAndDramaIdDrama(
                        idUsuario,
                        idDrama
                );

        if (resultado.isPresent()) {

            minhaListaRepository.delete(resultado.get());
        }
    }

    public void atualizarStatus(
            Integer idMinhaLista,
            String status) {

        Optional<MinhaLista> resultado =
                minhaListaRepository.findById(idMinhaLista);

        if (resultado.isPresent()) {

            MinhaLista minhaLista = resultado.get();

            minhaLista.setStatus(status);

            minhaListaRepository.save(minhaLista);
        }
    }
}