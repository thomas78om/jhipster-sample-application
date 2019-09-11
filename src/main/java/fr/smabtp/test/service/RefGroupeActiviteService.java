package fr.smabtp.test.service;

import fr.smabtp.test.domain.RefGroupeActivite;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RefGroupeActivite}.
 */
public interface RefGroupeActiviteService {

    /**
     * Save a refGroupeActivite.
     *
     * @param refGroupeActivite the entity to save.
     * @return the persisted entity.
     */
    RefGroupeActivite save(RefGroupeActivite refGroupeActivite);

    /**
     * Get all the refGroupeActivites.
     *
     * @return the list of entities.
     */
    List<RefGroupeActivite> findAll();


    /**
     * Get the "id" refGroupeActivite.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RefGroupeActivite> findOne(Long id);

    /**
     * Delete the "id" refGroupeActivite.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
