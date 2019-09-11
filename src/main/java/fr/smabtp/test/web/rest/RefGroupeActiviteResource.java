package fr.smabtp.test.web.rest;

import fr.smabtp.test.domain.RefGroupeActivite;
import fr.smabtp.test.service.RefGroupeActiviteService;
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
 * REST controller for managing {@link fr.smabtp.test.domain.RefGroupeActivite}.
 */
@RestController
@RequestMapping("/api")
public class RefGroupeActiviteResource {

    private final Logger log = LoggerFactory.getLogger(RefGroupeActiviteResource.class);

    private static final String ENTITY_NAME = "refGroupeActivite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGroupeActiviteService refGroupeActiviteService;

    public RefGroupeActiviteResource(RefGroupeActiviteService refGroupeActiviteService) {
        this.refGroupeActiviteService = refGroupeActiviteService;
    }

    /**
     * {@code POST  /ref-groupe-activites} : Create a new refGroupeActivite.
     *
     * @param refGroupeActivite the refGroupeActivite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGroupeActivite, or with status {@code 400 (Bad Request)} if the refGroupeActivite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-groupe-activites")
    public ResponseEntity<RefGroupeActivite> createRefGroupeActivite(@RequestBody RefGroupeActivite refGroupeActivite) throws URISyntaxException {
        log.debug("REST request to save RefGroupeActivite : {}", refGroupeActivite);
        if (refGroupeActivite.getId() != null) {
            throw new BadRequestAlertException("A new refGroupeActivite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGroupeActivite result = refGroupeActiviteService.save(refGroupeActivite);
        return ResponseEntity.created(new URI("/api/ref-groupe-activites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-groupe-activites} : Updates an existing refGroupeActivite.
     *
     * @param refGroupeActivite the refGroupeActivite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGroupeActivite,
     * or with status {@code 400 (Bad Request)} if the refGroupeActivite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGroupeActivite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-groupe-activites")
    public ResponseEntity<RefGroupeActivite> updateRefGroupeActivite(@RequestBody RefGroupeActivite refGroupeActivite) throws URISyntaxException {
        log.debug("REST request to update RefGroupeActivite : {}", refGroupeActivite);
        if (refGroupeActivite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGroupeActivite result = refGroupeActiviteService.save(refGroupeActivite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, refGroupeActivite.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-groupe-activites} : get all the refGroupeActivites.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGroupeActivites in body.
     */
    @GetMapping("/ref-groupe-activites")
    public List<RefGroupeActivite> getAllRefGroupeActivites() {
        log.debug("REST request to get all RefGroupeActivites");
        return refGroupeActiviteService.findAll();
    }

    /**
     * {@code GET  /ref-groupe-activites/:id} : get the "id" refGroupeActivite.
     *
     * @param id the id of the refGroupeActivite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGroupeActivite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-groupe-activites/{id}")
    public ResponseEntity<RefGroupeActivite> getRefGroupeActivite(@PathVariable Long id) {
        log.debug("REST request to get RefGroupeActivite : {}", id);
        Optional<RefGroupeActivite> refGroupeActivite = refGroupeActiviteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(refGroupeActivite);
    }

    /**
     * {@code DELETE  /ref-groupe-activites/:id} : delete the "id" refGroupeActivite.
     *
     * @param id the id of the refGroupeActivite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-groupe-activites/{id}")
    public ResponseEntity<Void> deleteRefGroupeActivite(@PathVariable Long id) {
        log.debug("REST request to delete RefGroupeActivite : {}", id);
        refGroupeActiviteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
