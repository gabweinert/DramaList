package DramaList.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Drama")
public class Drama {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDrama")
    private Integer idDrama;

    @Column(name = "titulo", nullable = false, length = 45)
    private String titulo;

    @Column(name = "paisOrigem", nullable = false, length = 45)
    private String paisOrigem;

    @Column(name = "dataLancamento", nullable = false)
    private LocalDate dataLancamento;

    @Column(name = "genero", nullable = false, length = 45)
    private String genero;

    @Column(name = "numeroEpisodios", nullable = false)
    private Integer numeroEpisodios;

    @Column(name = "sinopse", nullable = false, columnDefinition = "TEXT")
    private String sinopse;

    @Column(name = "plataformas", nullable = false, length = 255)
    private String plataformas;

    public Drama() {
    }

    public Drama(String titulo, String paisOrigem,
                 LocalDate dataLancamento, String genero,
                 Integer numeroEpisodios, String sinopse,
                 String plataformas) {

        this.titulo = titulo;
        this.paisOrigem = paisOrigem;
        this.dataLancamento = dataLancamento;
        this.genero = genero;
        this.numeroEpisodios = numeroEpisodios;
        this.sinopse = sinopse;
        this.plataformas = plataformas;
    }

    public Integer getIdDrama() {
        return idDrama;
    }

    public void setIdDrama(Integer idDrama) {
        this.idDrama = idDrama;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPaisOrigem() {
        return paisOrigem;
    }

    public void setPaisOrigem(String paisOrigem) {
        this.paisOrigem = paisOrigem;
    }

    public LocalDate getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getNumeroEpisodios() {
        return numeroEpisodios;
    }

    public void setNumeroEpisodios(Integer numeroEpisodios) {
        this.numeroEpisodios = numeroEpisodios;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getPlataformas() {
        return plataformas;
    }

    public void setPlataformas(String plataformas) {
        this.plataformas = plataformas;
    }
}