package DramaList.repository;

import DramaList.model.Drama;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DramaRepository extends JpaRepository<Drama, Integer> {

    List<Drama> findTop5ByIdDramaNot(Integer idDrama);
}