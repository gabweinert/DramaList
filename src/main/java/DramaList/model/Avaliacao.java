package DramaList.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAvaliacao")
    private Integer idAvaliacao;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    @Column(name = "resenha", length = 255)
    private String resenha;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idDrama", nullable = false)
    private Drama drama;

    public Avaliacao() {
    }

    public Avaliacao(Usuario usuario, Drama drama,
            Integer nota, String resenha) {

        this.usuario = usuario;
        this.drama = drama;
        this.nota = nota;
        this.resenha = resenha;
    }

    public Integer getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(Integer idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getResenha() {
        return resenha;
    }

    public void setResenha(String resenha) {
        this.resenha = resenha;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Drama getDrama() {
        return drama;
    }

    public void setDrama(Drama drama) {
        this.drama = drama;
    }
}
