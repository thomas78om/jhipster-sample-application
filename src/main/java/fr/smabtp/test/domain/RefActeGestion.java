package fr.smabtp.test.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A RefActeGestion.
 */
@Entity
@Table(name = "ref_acte_gestion")
public class RefActeGestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rag_code")
    private String ragCode;

    @Column(name = "rag_lib_court")
    private String ragLibCourt;

    @Column(name = "rag_lib_long")
    private String ragLibLong;

    @Column(name = "rag_comm")
    private String ragComm;

    @OneToMany(mappedBy = "refActeGestion")
    private Set<ActeGestionDelai> acteGestionDelais = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRagCode() {
        return ragCode;
    }

    public RefActeGestion ragCode(String ragCode) {
        this.ragCode = ragCode;
        return this;
    }

    public void setRagCode(String ragCode) {
        this.ragCode = ragCode;
    }

    public String getRagLibCourt() {
        return ragLibCourt;
    }

    public RefActeGestion ragLibCourt(String ragLibCourt) {
        this.ragLibCourt = ragLibCourt;
        return this;
    }

    public void setRagLibCourt(String ragLibCourt) {
        this.ragLibCourt = ragLibCourt;
    }

    public String getRagLibLong() {
        return ragLibLong;
    }

    public RefActeGestion ragLibLong(String ragLibLong) {
        this.ragLibLong = ragLibLong;
        return this;
    }

    public void setRagLibLong(String ragLibLong) {
        this.ragLibLong = ragLibLong;
    }

    public String getRagComm() {
        return ragComm;
    }

    public RefActeGestion ragComm(String ragComm) {
        this.ragComm = ragComm;
        return this;
    }

    public void setRagComm(String ragComm) {
        this.ragComm = ragComm;
    }

    public Set<ActeGestionDelai> getActeGestionDelais() {
        return acteGestionDelais;
    }

    public RefActeGestion acteGestionDelais(Set<ActeGestionDelai> acteGestionDelais) {
        this.acteGestionDelais = acteGestionDelais;
        return this;
    }

    public RefActeGestion addActeGestionDelai(ActeGestionDelai acteGestionDelai) {
        this.acteGestionDelais.add(acteGestionDelai);
        acteGestionDelai.setRefActeGestion(this);
        return this;
    }

    public RefActeGestion removeActeGestionDelai(ActeGestionDelai acteGestionDelai) {
        this.acteGestionDelais.remove(acteGestionDelai);
        acteGestionDelai.setRefActeGestion(null);
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
        if (!(o instanceof RefActeGestion)) {
            return false;
        }
        return id != null && id.equals(((RefActeGestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RefActeGestion{" +
            "id=" + getId() +
            ", ragCode='" + getRagCode() + "'" +
            ", ragLibCourt='" + getRagLibCourt() + "'" +
            ", ragLibLong='" + getRagLibLong() + "'" +
            ", ragComm='" + getRagComm() + "'" +
            "}";
    }
}
