package fr.smabtp.test.service.impl;

import fr.smabtp.test.service.ParamExportService;
import fr.smabtp.test.domain.ParamExport;
import fr.smabtp.test.repository.ParamExportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ParamExport}.
 */
@Service
@Transactional
public class ParamExportServiceImpl implements ParamExportService {

    private final Logger log = LoggerFactory.getLogger(ParamExportServiceImpl.class);

    private final ParamExportRepository paramExportRepository;

    public ParamExportServiceImpl(ParamExportRepository paramExportRepository) {
        this.paramExportRepository = paramExportRepository;
    }

    /**
     * Save a paramExport.
     *
     * @param paramExport the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ParamExport save(ParamExport paramExport) {
        log.debug("Request to save ParamExport : {}", paramExport);
        return paramExportRepository.save(paramExport);
    }

    /**
     * Get all the paramExports.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParamExport> findAll() {
        log.debug("Request to get all ParamExports");
        return paramExportRepository.findAll();
    }


    /**
     * Get one paramExport by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ParamExport> findOne(Long id) {
        log.debug("Request to get ParamExport : {}", id);
        return paramExportRepository.findById(id);
    }

    /**
     * Delete the paramExport by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ParamExport : {}", id);
        paramExportRepository.deleteById(id);
    }
}
