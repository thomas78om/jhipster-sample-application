package fr.smabtp.test.repository;

import fr.smabtp.test.domain.ParamExport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParamExport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParamExportRepository extends JpaRepository<ParamExport, Long> {

}
