package DramaList.repository;

import DramaList.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository
        extends JpaRepository<Avaliacao, Integer> {

    List<Avaliacao> findByDramaIdDrama(Integer idDrama);

    Optional<Avaliacao> findByUsuarioIdUsuarioAndDramaIdDrama(
            Integer idUsuario,
            Integer idDrama
    );

    List<Avaliacao> findByUsuarioIdUsuario(
            Integer idUsuario
    );
}