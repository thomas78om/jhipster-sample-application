package fr.smabtp.test.web.rest;

import fr.smabtp.test.domain.Audit;
import fr.smabtp.test.service.AuditService;
import fr.smabtp.test.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.smabtp.test.domain.Audit}.
 */
@RestController
@RequestMapping("/api")
public class AuditResource {

    private final Logger log = LoggerFactory.getLogger(AuditResource.class);

    private static final String ENTITY_NAME = "audit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AuditService auditService;

    public AuditResource(AuditService auditService) {
        this.auditService = auditService;
    }

    /**
     * {@code POST  /audits} : Create a new audit.
     *
     * @param audit the audit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new audit, or with status {@code 400 (Bad Request)} if the audit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/audits")
    public ResponseEntity<Audit> createAudit(@RequestBody Audit audit) throws URISyntaxException {
        log.debug("REST request to save Audit : {}", audit);
        if (audit.getId() != null) {
            throw new BadRequestAlertException("A new audit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Audit result = auditService.save(audit);
        return ResponseEntity.created(new URI("/api/audits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /audits} : Updates an existing audit.
     *
     * @param audit the audit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated audit,
     * or with status {@code 400 (Bad Request)} if the audit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the audit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/audits")
    public ResponseEntity<Audit> updateAudit(@RequestBody Audit audit) throws URISyntaxException {
        log.debug("REST request to update Audit : {}", audit);
        if (audit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Audit result = auditService.save(audit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, audit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /audits} : get all the audits.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of audits in body.
     */
    @GetMapping("/audits")
    public List<Audit> getAllAudits() {
        log.debug("REST request to get all Audits");
        return auditService.findAll();
    }

    /**
     * {@code GET  /audits/:id} : get the "id" audit.
     *
     * @param id the id of the audit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the audit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/audits/{id}")
    public ResponseEntity<Audit> getAudit(@PathVariable Long id) {
        log.debug("REST request to get Audit : {}", id);
        Optional<Audit> audit = auditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(audit);
    }

    /**
     * {@code DELETE  /audits/:id} : delete the "id" audit.
     *
     * @param id the id of the audit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/audits/{id}")
    public ResponseEntity<Void> deleteAudit(@PathVariable Long id) {
        log.debug("REST request to delete Audit : {}", id);
        auditService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
