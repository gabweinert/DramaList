package DramaList.repository;

import DramaList.model.MinhaLista;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MinhaListaRepository extends JpaRepository<MinhaLista, Integer> {

    List<MinhaLista> findByUsuarioIdUsuario(Integer idUsuario);

    boolean existsByUsuarioIdUsuarioAndDramaIdDrama(
            Integer idUsuario,
            Integer idDrama
    );

    Optional<MinhaLista> findByUsuarioIdUsuarioAndDramaIdDrama(
            Integer idUsuario,
            Integer idDrama
    );
}