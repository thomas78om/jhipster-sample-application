package fr.smabtp.test.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Audit.
 */
@Entity
@Table(name = "audit")
public class Audit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aud_id")
    private Integer audId;

    @Column(name = "aud_utilisateur")
    private String audUtilisateur;

    @Column(name = "aud_description")
    private String audDescription;

    @Column(name = "aud_datetime")
    private LocalDate audDatetime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAudId() {
        return audId;
    }

    public Audit audId(Integer audId) {
        this.audId = audId;
        return this;
    }

    public void setAudId(Integer audId) {
        this.audId = audId;
    }

    public String getAudUtilisateur() {
        return audUtilisateur;
    }

    public Audit audUtilisateur(String audUtilisateur) {
        this.audUtilisateur = audUtilisateur;
        return this;
    }

    public void setAudUtilisateur(String audUtilisateur) {
        this.audUtilisateur = audUtilisateur;
    }

    public String getAudDescription() {
        return audDescription;
    }

    public Audit audDescription(String audDescription) {
        this.audDescription = audDescription;
        return this;
    }

    public void setAudDescription(String audDescription) {
        this.audDescription = audDescription;
    }

    public LocalDate getAudDatetime() {
        return audDatetime;
    }

    public Audit audDatetime(LocalDate audDatetime) {
        this.audDatetime = audDatetime;
        return this;
    }

    public void setAudDatetime(LocalDate audDatetime) {
        this.audDatetime = audDatetime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Audit)) {
            return false;
        }
        return id != null && id.equals(((Audit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Audit{" +
            "id=" + getId() +
            ", audId=" + getAudId() +
            ", audUtilisateur='" + getAudUtilisateur() + "'" +
            ", audDescription='" + getAudDescription() + "'" +
            ", audDatetime='" + getAudDatetime() + "'" +
            "}";
    }
}
