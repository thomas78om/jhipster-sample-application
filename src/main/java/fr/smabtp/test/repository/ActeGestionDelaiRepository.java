package fr.smabtp.test.repository;

import fr.smabtp.test.domain.ActeGestionDelai;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ActeGestionDelai entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActeGestionDelaiRepository extends JpaRepository<ActeGestionDelai, Long> {

}
