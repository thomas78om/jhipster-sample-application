package fr.smabtp.test.service;

import fr.smabtp.test.domain.RefActeGestion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RefActeGestion}.
 */
public interface RefActeGestionService {

    /**
     * Save a refActeGestion.
     *
     * @param refActeGestion the entity to save.
     * @return the persisted entity.
     */
    RefActeGestion save(RefActeGestion refActeGestion);

    /**
     * Get all the refActeGestions.
     *
     * @return the list of entities.
     */
    List<RefActeGestion> findAll();


    /**
     * Get the "id" refActeGestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RefActeGestion> findOne(Long id);

    /**
     * Delete the "id" refActeGestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
