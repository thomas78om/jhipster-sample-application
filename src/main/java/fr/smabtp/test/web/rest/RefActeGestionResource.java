package fr.smabtp.test.web.rest;

import fr.smabtp.test.domain.RefActeGestion;
import fr.smabtp.test.service.RefActeGestionService;
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
 * REST controller for managing {@link fr.smabtp.test.domain.RefActeGestion}.
 */
@RestController
@RequestMapping("/api")
public class RefActeGestionResource {

    private final Logger log = LoggerFactory.getLogger(RefActeGestionResource.class);

    private static final String ENTITY_NAME = "refActeGestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefActeGestionService refActeGestionService;

    public RefActeGestionResource(RefActeGestionService refActeGestionService) {
        this.refActeGestionService = refActeGestionService;
    }

    /**
     * {@code POST  /ref-acte-gestions} : Create a new refActeGestion.
     *
     * @param refActeGestion the refActeGestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refActeGestion, or with status {@code 400 (Bad Request)} if the refActeGestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-acte-gestions")
    public ResponseEntity<RefActeGestion> createRefActeGestion(@RequestBody RefActeGestion refActeGestion) throws URISyntaxException {
        log.debug("REST request to save RefActeGestion : {}", refActeGestion);
        if (refActeGestion.getId() != null) {
            throw new BadRequestAlertException("A new refActeGestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefActeGestion result = refActeGestionService.save(refActeGestion);
        return ResponseEntity.created(new URI("/api/ref-acte-gestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-acte-gestions} : Updates an existing refActeGestion.
     *
     * @param refActeGestion the refActeGestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refActeGestion,
     * or with status {@code 400 (Bad Request)} if the refActeGestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refActeGestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-acte-gestions")
    public ResponseEntity<RefActeGestion> updateRefActeGestion(@RequestBody RefActeGestion refActeGestion) throws URISyntaxException {
        log.debug("REST request to update RefActeGestion : {}", refActeGestion);
        if (refActeGestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefActeGestion result = refActeGestionService.save(refActeGestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, refActeGestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-acte-gestions} : get all the refActeGestions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refActeGestions in body.
     */
    @GetMapping("/ref-acte-gestions")
    public List<RefActeGestion> getAllRefActeGestions() {
        log.debug("REST request to get all RefActeGestions");
        return refActeGestionService.findAll();
    }

    /**
     * {@code GET  /ref-acte-gestions/:id} : get the "id" refActeGestion.
     *
     * @param id the id of the refActeGestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refActeGestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-acte-gestions/{id}")
    public ResponseEntity<RefActeGestion> getRefActeGestion(@PathVariable Long id) {
        log.debug("REST request to get RefActeGestion : {}", id);
        Optional<RefActeGestion> refActeGestion = refActeGestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(refActeGestion);
    }

    /**
     * {@code DELETE  /ref-acte-gestions/:id} : delete the "id" refActeGestion.
     *
     * @param id the id of the refActeGestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-acte-gestions/{id}")
    public ResponseEntity<Void> deleteRefActeGestion(@PathVariable Long id) {
        log.debug("REST request to delete RefActeGestion : {}", id);
        refActeGestionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
