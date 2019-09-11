package fr.smabtp.test.service.impl;

import fr.smabtp.test.service.ActeGestionDelaiService;
import fr.smabtp.test.domain.ActeGestionDelai;
import fr.smabtp.test.repository.ActeGestionDelaiRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ActeGestionDelai}.
 */
@Service
@Transactional
public class ActeGestionDelaiServiceImpl implements ActeGestionDelaiService {

    private final Logger log = LoggerFactory.getLogger(ActeGestionDelaiServiceImpl.class);

    private final ActeGestionDelaiRepository acteGestionDelaiRepository;

    public ActeGestionDelaiServiceImpl(ActeGestionDelaiRepository acteGestionDelaiRepository) {
        this.acteGestionDelaiRepository = acteGestionDelaiRepository;
    }

    /**
     * Save a acteGestionDelai.
     *
     * @param acteGestionDelai the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ActeGestionDelai save(ActeGestionDelai acteGestionDelai) {
        log.debug("Request to save ActeGestionDelai : {}", acteGestionDelai);
        return acteGestionDelaiRepository.save(acteGestionDelai);
    }

    /**
     * Get all the acteGestionDelais.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ActeGestionDelai> findAll() {
        log.debug("Request to get all ActeGestionDelais");
        return acteGestionDelaiRepository.findAll();
    }


    /**
     * Get one acteGestionDelai by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ActeGestionDelai> findOne(Long id) {
        log.debug("Request to get ActeGestionDelai : {}", id);
        return acteGestionDelaiRepository.findById(id);
    }

    /**
     * Delete the acteGestionDelai by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ActeGestionDelai : {}", id);
        acteGestionDelaiRepository.deleteById(id);
    }
}
