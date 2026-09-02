package DramaList.service;

import DramaList.model.Avaliacao;
import DramaList.repository.AvaliacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoService(
            AvaliacaoRepository avaliacaoRepository) {

        this.avaliacaoRepository =
                avaliacaoRepository;
    }


    public List<Avaliacao> listarTodas() {

        return avaliacaoRepository.findAll();
    }


    public Optional<Avaliacao> buscarPorId(
            Integer id) {

        return avaliacaoRepository.findById(id);
    }


    public Avaliacao salvar(
            Avaliacao avaliacao) {

        return avaliacaoRepository.save(
                avaliacao
        );
    }


    public void excluir(
            Integer id) {

        avaliacaoRepository.deleteById(id);
    }


    public List<Avaliacao> listarPorDrama(
            Integer idDrama) {

        return avaliacaoRepository
                .findByDramaIdDrama(idDrama);
    }


    public Optional<Avaliacao> buscarPorUsuarioEDrama(
            Integer idUsuario,
            Integer idDrama) {

        return avaliacaoRepository
                .findByUsuarioIdUsuarioAndDramaIdDrama(
                        idUsuario,
                        idDrama
                );
    }


    public List<Avaliacao> listarPorUsuario(
            Integer idUsuario) {

        return avaliacaoRepository
                .findByUsuarioIdUsuario(idUsuario);
    }


    public Double calcularMediaPorDrama(
            Integer idDrama) {

        List<Avaliacao> avaliacoes =
                avaliacaoRepository
                        .findByDramaIdDrama(idDrama);


        if (avaliacoes.isEmpty()) {

            return null;
        }


        double soma = 0;


        for (Avaliacao avaliacao : avaliacoes) {

            soma += avaliacao.getNota();
        }


        return soma / avaliacoes.size();
    }
}