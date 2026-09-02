package DramaList.model;

import jakarta.persistence.*;

@Entity
@Table(
    name = "MinhaLista",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"idUsuario", "idDrama"})
    }
)
public class MinhaLista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMinhaLista")
    private Integer idMinhaLista;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idDrama", nullable = false)
    private Drama drama;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    public MinhaLista() {
    }

    public MinhaLista(Usuario usuario, Drama drama) {
        this.usuario = usuario;
        this.drama = drama;
        this.status = "Quero assistir";
    }

    public Integer getIdMinhaLista() {
        return idMinhaLista;
    }

    public void setIdMinhaLista(Integer idMinhaLista) {
        this.idMinhaLista = idMinhaLista;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}