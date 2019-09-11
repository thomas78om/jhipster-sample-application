package fr.smabtp.test.service;

import fr.smabtp.test.domain.ActeGestionDelai;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ActeGestionDelai}.
 */
public interface ActeGestionDelaiService {

    /**
     * Save a acteGestionDelai.
     *
     * @param acteGestionDelai the entity to save.
     * @return the persisted entity.
     */
    ActeGestionDelai save(ActeGestionDelai acteGestionDelai);

    /**
     * Get all the acteGestionDelais.
     *
     * @return the list of entities.
     */
    List<ActeGestionDelai> findAll();


    /**
     * Get the "id" acteGestionDelai.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ActeGestionDelai> findOne(Long id);

    /**
     * Delete the "id" acteGestionDelai.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
