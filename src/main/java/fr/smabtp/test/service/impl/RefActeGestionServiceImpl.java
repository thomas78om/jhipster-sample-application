package fr.smabtp.test.service.impl;

import fr.smabtp.test.service.RefActeGestionService;
import fr.smabtp.test.domain.RefActeGestion;
import fr.smabtp.test.repository.RefActeGestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link RefActeGestion}.
 */
@Service
@Transactional
public class RefActeGestionServiceImpl implements RefActeGestionService {

    private final Logger log = LoggerFactory.getLogger(RefActeGestionServiceImpl.class);

    private final RefActeGestionRepository refActeGestionRepository;

    public RefActeGestionServiceImpl(RefActeGestionRepository refActeGestionRepository) {
        this.refActeGestionRepository = refActeGestionRepository;
    }

    /**
     * Save a refActeGestion.
     *
     * @param refActeGestion the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RefActeGestion save(RefActeGestion refActeGestion) {
        log.debug("Request to save RefActeGestion : {}", refActeGestion);
        return refActeGestionRepository.save(refActeGestion);
    }

    /**
     * Get all the refActeGestions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RefActeGestion> findAll() {
        log.debug("Request to get all RefActeGestions");
        return refActeGestionRepository.findAll();
    }


    /**
     * Get one refActeGestion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RefActeGestion> findOne(Long id) {
        log.debug("Request to get RefActeGestion : {}", id);
        return refActeGestionRepository.findById(id);
    }

    /**
     * Delete the refActeGestion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RefActeGestion : {}", id);
        refActeGestionRepository.deleteById(id);
    }
}
