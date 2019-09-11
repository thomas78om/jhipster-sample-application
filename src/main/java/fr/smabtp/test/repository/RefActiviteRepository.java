package fr.smabtp.test.repository;

import fr.smabtp.test.domain.RefActivite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RefActivite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefActiviteRepository extends JpaRepository<RefActivite, Long> {

}
