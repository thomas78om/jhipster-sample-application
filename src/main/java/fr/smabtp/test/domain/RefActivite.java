package fr.smabtp.test.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A RefActivite.
 */
@Entity
@Table(name = "ref_activite")
public class RefActivite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rac_code")
    private String racCode;

    @Column(name = "rac_lib_court")
    private String racLibCourt;

    @Column(name = "rac_lib_long")
    private String racLibLong;

    @Column(name = "rac_comm")
    private String racComm;

    @OneToMany(mappedBy = "refActivite")
    private Set<ActeGestionDelai> acteGestionDelais = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRacCode() {
        return racCode;
    }

    public RefActivite racCode(String racCode) {
        this.racCode = racCode;
        return this;
    }

    public void setRacCode(String racCode) {
        this.racCode = racCode;
    }

    public String getRacLibCourt() {
        return racLibCourt;
    }

    public RefActivite racLibCourt(String racLibCourt) {
        this.racLibCourt = racLibCourt;
        return this;
    }

    public void setRacLibCourt(String racLibCourt) {
        this.racLibCourt = racLibCourt;
    }

    public String getRacLibLong() {
        return racLibLong;
    }

    public RefActivite racLibLong(String racLibLong) {
        this.racLibLong = racLibLong;
        return this;
    }

    public void setRacLibLong(String racLibLong) {
        this.racLibLong = racLibLong;
    }

    public String getRacComm() {
        return racComm;
    }

    public RefActivite racComm(String racComm) {
        this.racComm = racComm;
        return this;
    }

    public void setRacComm(String racComm) {
        this.racComm = racComm;
    }

    public Set<ActeGestionDelai> getActeGestionDelais() {
        return acteGestionDelais;
    }

    public RefActivite acteGestionDelais(Set<ActeGestionDelai> acteGestionDelais) {
        this.acteGestionDelais = acteGestionDelais;
        return this;
    }

    public RefActivite addActeGestionDelai(ActeGestionDelai acteGestionDelai) {
        this.acteGestionDelais.add(acteGestionDelai);
        acteGestionDelai.setRefActivite(this);
        return this;
    }

    public RefActivite removeActeGestionDelai(ActeGestionDelai acteGestionDelai) {
        this.acteGestionDelais.remove(acteGestionDelai);
        acteGestionDelai.setRefActivite(null);
        return this;
    }

    public void setActeGestionDelais(Set<ActeGestionDelai> acteGestionDelais) {
        this.acteGestionDelais = acteGestionDelais;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefActivite)) {
            return false;
        }
        return id != null && id.equals(((RefActivite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RefActivite{" +
            "id=" + getId() +
            ", racCode='" + getRacCode() + "'" +
            ", racLibCourt='" + getRacLibCourt() + "'" +
            ", racLibLong='" + getRacLibLong() + "'" +
            ", racComm='" + getRacComm() + "'" +
            "}";
    }
}
