package fr.smabtp.test.web.rest;

import fr.smabtp.test.JhipsterSampleApplicationApp;
import fr.smabtp.test.domain.Audit;
import fr.smabtp.test.repository.AuditRepository;
import fr.smabtp.test.service.AuditService;
import fr.smabtp.test.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static fr.smabtp.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AuditResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class AuditResourceIT {

    private static final Integer DEFAULT_AUD_ID = 1;
    private static final Integer UPDATED_AUD_ID = 2;
    private static final Integer SMALLER_AUD_ID = 1 - 1;

    private static final String DEFAULT_AUD_UTILISATEUR = "AAAAAAAAAA";
    private static final String UPDATED_AUD_UTILISATEUR = "BBBBBBBBBB";

    private static final String DEFAULT_AUD_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_AUD_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_AUD_DATETIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_AUD_DATETIME = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_AUD_DATETIME = LocalDate.ofEpochDay(-1L);

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private AuditService auditService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAuditMockMvc;

    private Audit audit;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuditResource auditResource = new AuditResource(auditService);
        this.restAuditMockMvc = MockMvcBuilders.standaloneSetup(auditResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Audit createEntity(EntityManager em) {
        Audit audit = new Audit()
            .audId(DEFAULT_AUD_ID)
            .audUtilisateur(DEFAULT_AUD_UTILISATEUR)
            .audDescription(DEFAULT_AUD_DESCRIPTION)
            .audDatetime(DEFAULT_AUD_DATETIME);
        return audit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Audit createUpdatedEntity(EntityManager em) {
        Audit audit = new Audit()
            .audId(UPDATED_AUD_ID)
            .audUtilisateur(UPDATED_AUD_UTILISATEUR)
            .audDescription(UPDATED_AUD_DESCRIPTION)
            .audDatetime(UPDATED_AUD_DATETIME);
        return audit;
    }

    @BeforeEach
    public void initTest() {
        audit = createEntity(em);
    }

    @Test
    @Transactional
    public void createAudit() throws Exception {
        int databaseSizeBeforeCreate = auditRepository.findAll().size();

        // Create the Audit
        restAuditMockMvc.perform(post("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audit)))
            .andExpect(status().isCreated());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeCreate + 1);
        Audit testAudit = auditList.get(auditList.size() - 1);
        assertThat(testAudit.getAudId()).isEqualTo(DEFAULT_AUD_ID);
        assertThat(testAudit.getAudUtilisateur()).isEqualTo(DEFAULT_AUD_UTILISATEUR);
        assertThat(testAudit.getAudDescription()).isEqualTo(DEFAULT_AUD_DESCRIPTION);
        assertThat(testAudit.getAudDatetime()).isEqualTo(DEFAULT_AUD_DATETIME);
    }

    @Test
    @Transactional
    public void createAuditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auditRepository.findAll().size();

        // Create the Audit with an existing ID
        audit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuditMockMvc.perform(post("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audit)))
            .andExpect(status().isBadRequest());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAudits() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList
        restAuditMockMvc.perform(get("/api/audits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(audit.getId().intValue())))
            .andExpect(jsonPath("$.[*].audId").value(hasItem(DEFAULT_AUD_ID)))
            .andExpect(jsonPath("$.[*].audUtilisateur").value(hasItem(DEFAULT_AUD_UTILISATEUR.toString())))
            .andExpect(jsonPath("$.[*].audDescription").value(hasItem(DEFAULT_AUD_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].audDatetime").value(hasItem(DEFAULT_AUD_DATETIME.toString())));
    }
    
    @Test
    @Transactional
    public void getAudit() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get the audit
        restAuditMockMvc.perform(get("/api/audits/{id}", audit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(audit.getId().intValue()))
            .andExpect(jsonPath("$.audId").value(DEFAULT_AUD_ID))
            .andExpect(jsonPath("$.audUtilisateur").value(DEFAULT_AUD_UTILISATEUR.toString()))
            .andExpect(jsonPath("$.audDescription").value(DEFAULT_AUD_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.audDatetime").value(DEFAULT_AUD_DATETIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAudit() throws Exception {
        // Get the audit
        restAuditMockMvc.perform(get("/api/audits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAudit() throws Exception {
        // Initialize the database
        auditService.save(audit);

        int databaseSizeBeforeUpdate = auditRepository.findAll().size();

        // Update the audit
        Audit updatedAudit = auditRepository.findById(audit.getId()).get();
        // Disconnect from session so that the updates on updatedAudit are not directly saved in db
        em.detach(updatedAudit);
        updatedAudit
            .audId(UPDATED_AUD_ID)
            .audUtilisateur(UPDATED_AUD_UTILISATEUR)
            .audDescription(UPDATED_AUD_DESCRIPTION)
            .audDatetime(UPDATED_AUD_DATETIME);

        restAuditMockMvc.perform(put("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAudit)))
            .andExpect(status().isOk());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeUpdate);
        Audit testAudit = auditList.get(auditList.size() - 1);
        assertThat(testAudit.getAudId()).isEqualTo(UPDATED_AUD_ID);
        assertThat(testAudit.getAudUtilisateur()).isEqualTo(UPDATED_AUD_UTILISATEUR);
        assertThat(testAudit.getAudDescription()).isEqualTo(UPDATED_AUD_DESCRIPTION);
        assertThat(testAudit.getAudDatetime()).isEqualTo(UPDATED_AUD_DATETIME);
    }

    @Test
    @Transactional
    public void updateNonExistingAudit() throws Exception {
        int databaseSizeBeforeUpdate = auditRepository.findAll().size();

        // Create the Audit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuditMockMvc.perform(put("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audit)))
            .andExpect(status().isBadRequest());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAudit() throws Exception {
        // Initialize the database
        auditService.save(audit);

        int databaseSizeBeforeDelete = auditRepository.findAll().size();

        // Delete the audit
        restAuditMockMvc.perform(delete("/api/audits/{id}", audit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Audit.class);
        Audit audit1 = new Audit();
        audit1.setId(1L);
        Audit audit2 = new Audit();
        audit2.setId(audit1.getId());
        assertThat(audit1).isEqualTo(audit2);
        audit2.setId(2L);
        assertThat(audit1).isNotEqualTo(audit2);
        audit1.setId(null);
        assertThat(audit1).isNotEqualTo(audit2);
    }
}
