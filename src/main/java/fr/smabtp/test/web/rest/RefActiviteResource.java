package fr.smabtp.test.web.rest;

import fr.smabtp.test.domain.RefActivite;
import fr.smabtp.test.service.RefActiviteService;
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
 * REST controller for managing {@link fr.smabtp.test.domain.RefActivite}.
 */
@RestController
@RequestMapping("/api")
public class RefActiviteResource {

    private final Logger log = LoggerFactory.getLogger(RefActiviteResource.class);

    private static final String ENTITY_NAME = "refActivite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefActiviteService refActiviteService;

    public RefActiviteResource(RefActiviteService refActiviteService) {
        this.refActiviteService = refActiviteService;
    }

    /**
     * {@code POST  /ref-activites} : Create a new refActivite.
     *
     * @param refActivite the refActivite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refActivite, or with status {@code 400 (Bad Request)} if the refActivite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-activites")
    public ResponseEntity<RefActivite> createRefActivite(@RequestBody RefActivite refActivite) throws URISyntaxException {
        log.debug("REST request to save RefActivite : {}", refActivite);
        if (refActivite.getId() != null) {
            throw new BadRequestAlertException("A new refActivite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefActivite result = refActiviteService.save(refActivite);
        return ResponseEntity.created(new URI("/api/ref-activites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-activites} : Updates an existing refActivite.
     *
     * @param refActivite the refActivite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refActivite,
     * or with status {@code 400 (Bad Request)} if the refActivite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refActivite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-activites")
    public ResponseEntity<RefActivite> updateRefActivite(@RequestBody RefActivite refActivite) throws URISyntaxException {
        log.debug("REST request to update RefActivite : {}", refActivite);
        if (refActivite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefActivite result = refActiviteService.save(refActivite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, refActivite.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-activites} : get all the refActivites.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refActivites in body.
     */
    @GetMapping("/ref-activites")
    public List<RefActivite> getAllRefActivites() {
        log.debug("REST request to get all RefActivites");
        return refActiviteService.findAll();
    }

    /**
     * {@code GET  /ref-activites/:id} : get the "id" refActivite.
     *
     * @param id the id of the refActivite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refActivite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-activites/{id}")
    public ResponseEntity<RefActivite> getRefActivite(@PathVariable Long id) {
        log.debug("REST request to get RefActivite : {}", id);
        Optional<RefActivite> refActivite = refActiviteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(refActivite);
    }

    /**
     * {@code DELETE  /ref-activites/:id} : delete the "id" refActivite.
     *
     * @param id the id of the refActivite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-activites/{id}")
    public ResponseEntity<Void> deleteRefActivite(@PathVariable Long id) {
        log.debug("REST request to delete RefActivite : {}", id);
        refActiviteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
