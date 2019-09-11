package fr.smabtp.test.service.impl;

import fr.smabtp.test.service.RefGroupeActiviteService;
import fr.smabtp.test.domain.RefGroupeActivite;
import fr.smabtp.test.repository.RefGroupeActiviteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link RefGroupeActivite}.
 */
@Service
@Transactional
public class RefGroupeActiviteServiceImpl implements RefGroupeActiviteService {

    private final Logger log = LoggerFactory.getLogger(RefGroupeActiviteServiceImpl.class);

    private final RefGroupeActiviteRepository refGroupeActiviteRepository;

    public RefGroupeActiviteServiceImpl(RefGroupeActiviteRepository refGroupeActiviteRepository) {
        this.refGroupeActiviteRepository = refGroupeActiviteRepository;
    }

    /**
     * Save a refGroupeActivite.
     *
     * @param refGroupeActivite the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RefGroupeActivite save(RefGroupeActivite refGroupeActivite) {
        log.debug("Request to save RefGroupeActivite : {}", refGroupeActivite);
        return refGroupeActiviteRepository.save(refGroupeActivite);
    }

    /**
     * Get all the refGroupeActivites.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RefGroupeActivite> findAll() {
        log.debug("Request to get all RefGroupeActivites");
        return refGroupeActiviteRepository.findAll();
    }


    /**
     * Get one refGroupeActivite by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RefGroupeActivite> findOne(Long id) {
        log.debug("Request to get RefGroupeActivite : {}", id);
        return refGroupeActiviteRepository.findById(id);
    }

    /**
     * Delete the refGroupeActivite by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RefGroupeActivite : {}", id);
        refGroupeActiviteRepository.deleteById(id);
    }
}
