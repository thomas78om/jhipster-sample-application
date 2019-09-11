package fr.smabtp.test.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A ParamExport.
 */
@Entity
@Table(name = "param_export")
public class ParamExport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pex_publish")
    private Integer pexPublish;

    @Column(name = "pex_dtlastexport")
    private LocalDate pexDtlastexport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPexPublish() {
        return pexPublish;
    }

    public ParamExport pexPublish(Integer pexPublish) {
        this.pexPublish = pexPublish;
        return this;
    }

    public void setPexPublish(Integer pexPublish) {
        this.pexPublish = pexPublish;
    }

    public LocalDate getPexDtlastexport() {
        return pexDtlastexport;
    }

    public ParamExport pexDtlastexport(LocalDate pexDtlastexport) {
        this.pexDtlastexport = pexDtlastexport;
        return this;
    }

    public void setPexDtlastexport(LocalDate pexDtlastexport) {
        this.pexDtlastexport = pexDtlastexport;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParamExport)) {
            return false;
        }
        return id != null && id.equals(((ParamExport) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ParamExport{" +
            "id=" + getId() +
            ", pexPublish=" + getPexPublish() +
            ", pexDtlastexport='" + getPexDtlastexport() + "'" +
            "}";
    }
}
