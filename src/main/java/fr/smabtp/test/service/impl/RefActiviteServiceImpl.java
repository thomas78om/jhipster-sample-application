package fr.smabtp.test.service.impl;

import fr.smabtp.test.service.RefActiviteService;
import fr.smabtp.test.domain.RefActivite;
import fr.smabtp.test.repository.RefActiviteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link RefActivite}.
 */
@Service
@Transactional
public class RefActiviteServiceImpl implements RefActiviteService {

    private final Logger log = LoggerFactory.getLogger(RefActiviteServiceImpl.class);

    private final RefActiviteRepository refActiviteRepository;

    public RefActiviteServiceImpl(RefActiviteRepository refActiviteRepository) {
        this.refActiviteRepository = refActiviteRepository;
    }

    /**
     * Save a refActivite.
     *
     * @param refActivite the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RefActivite save(RefActivite refActivite) {
        log.debug("Request to save RefActivite : {}", refActivite);
        return refActiviteRepository.save(refActivite);
    }

    /**
     * Get all the refActivites.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RefActivite> findAll() {
        log.debug("Request to get all RefActivites");
        return refActiviteRepository.findAll();
    }


    /**
     * Get one refActivite by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RefActivite> findOne(Long id) {
        log.debug("Request to get RefActivite : {}", id);
        return refActiviteRepository.findById(id);
    }

    /**
     * Delete the refActivite by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RefActivite : {}", id);
        refActiviteRepository.deleteById(id);
    }
}
