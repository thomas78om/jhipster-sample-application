package fr.smabtp.test.service;

import fr.smabtp.test.domain.RefActivite;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RefActivite}.
 */
public interface RefActiviteService {

    /**
     * Save a refActivite.
     *
     * @param refActivite the entity to save.
     * @return the persisted entity.
     */
    RefActivite save(RefActivite refActivite);

    /**
     * Get all the refActivites.
     *
     * @return the list of entities.
     */
    List<RefActivite> findAll();


    /**
     * Get the "id" refActivite.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RefActivite> findOne(Long id);

    /**
     * Delete the "id" refActivite.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
