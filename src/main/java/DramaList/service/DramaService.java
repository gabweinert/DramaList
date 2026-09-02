package DramaList.service;

import DramaList.model.Drama;
import DramaList.repository.DramaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DramaService {

    private final DramaRepository dramaRepository;

    public DramaService(DramaRepository dramaRepository) {
        this.dramaRepository = dramaRepository;
    }

    public List<Drama> listarTodos() {
        return dramaRepository.findAll();
    }

    public Optional<Drama> buscarPorId(Integer id) {
        return dramaRepository.findById(id);
    }

    public Drama salvar(Drama drama) {
        return dramaRepository.save(drama);
    }

    public void excluir(Integer id) {
        dramaRepository.deleteById(id);
    }

    public List<Drama> listarRecomendacoes(Integer idDrama) {
        return dramaRepository.findTop5ByIdDramaNot(idDrama);
    }
}