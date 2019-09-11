package fr.smabtp.test.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ActeGestionDelai.
 */
@Entity
@Table(name = "acte_gestion_delai")
public class ActeGestionDelai implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rac_code")
    private String racCode;

    @Column(name = "rag_code")
    private String ragCode;

    @Column(name = "rga_code")
    private String rgaCode;

    @Column(name = "agd_delai")
    private Long agdDelai;

    @Column(name = "agd_attente")
    private Long agdAttente;

    @Column(name = "agd_comm")
    private String agdComm;

    @ManyToOne
    @JsonIgnoreProperties("acteGestionDelais")
    private RefGroupeActivite refGroupeActivite;

    @ManyToOne
    @JsonIgnoreProperties("acteGestionDelais")
    private RefActeGestion refActeGestion;

    @ManyToOne
    @JsonIgnoreProperties("acteGestionDelais")
    private RefActivite refActivite;

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

    public ActeGestionDelai racCode(String racCode) {
        this.racCode = racCode;
        return this;
    }

    public void setRacCode(String racCode) {
        this.racCode = racCode;
    }

    public String getRagCode() {
        return ragCode;
    }

    public ActeGestionDelai ragCode(String ragCode) {
        this.ragCode = ragCode;
        return this;
    }

    public void setRagCode(String ragCode) {
        this.ragCode = ragCode;
    }

    public String getRgaCode() {
        return rgaCode;
    }

    public ActeGestionDelai rgaCode(String rgaCode) {
        this.rgaCode = rgaCode;
        return this;
    }

    public void setRgaCode(String rgaCode) {
        this.rgaCode = rgaCode;
    }

    public Long getAgdDelai() {
        return agdDelai;
    }

    public ActeGestionDelai agdDelai(Long agdDelai) {
        this.agdDelai = agdDelai;
        return this;
    }

    public void setAgdDelai(Long agdDelai) {
        this.agdDelai = agdDelai;
    }

    public Long getAgdAttente() {
        return agdAttente;
    }

    public ActeGestionDelai agdAttente(Long agdAttente) {
        this.agdAttente = agdAttente;
        return this;
    }

    public void setAgdAttente(Long agdAttente) {
        this.agdAttente = agdAttente;
    }

    public String getAgdComm() {
        return agdComm;
    }

    public ActeGestionDelai agdComm(String agdComm) {
        this.agdComm = agdComm;
        return this;
    }

    public void setAgdComm(String agdComm) {
        this.agdComm = agdComm;
    }

    public RefGroupeActivite getRefGroupeActivite() {
        return refGroupeActivite;
    }

    public ActeGestionDelai refGroupeActivite(RefGroupeActivite refGroupeActivite) {
        this.refGroupeActivite = refGroupeActivite;
        return this;
    }

    public void setRefGroupeActivite(RefGroupeActivite refGroupeActivite) {
        this.refGroupeActivite = refGroupeActivite;
    }

    public RefActeGestion getRefActeGestion() {
        return refActeGestion;
    }

    public ActeGestionDelai refActeGestion(RefActeGestion refActeGestion) {
        this.refActeGestion = refActeGestion;
        return this;
    }

    public void setRefActeGestion(RefActeGestion refActeGestion) {
        this.refActeGestion = refActeGestion;
    }

    public RefActivite getRefActivite() {
        return refActivite;
    }

    public ActeGestionDelai refActivite(RefActivite refActivite) {
        this.refActivite = refActivite;
        return this;
    }

    public void setRefActivite(RefActivite refActivite) {
        this.refActivite = refActivite;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActeGestionDelai)) {
            return false;
        }
        return id != null && id.equals(((ActeGestionDelai) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ActeGestionDelai{" +
            "id=" + getId() +
            ", racCode='" + getRacCode() + "'" +
            ", ragCode='" + getRagCode() + "'" +
            ", rgaCode='" + getRgaCode() + "'" +
            ", agdDelai=" + getAgdDelai() +
            ", agdAttente=" + getAgdAttente() +
            ", agdComm='" + getAgdComm() + "'" +
            "}";
    }
}
