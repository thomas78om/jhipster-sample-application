package fr.smabtp.test.web.rest;

import fr.smabtp.test.JhipsterSampleApplicationApp;
import fr.smabtp.test.domain.RefActeGestion;
import fr.smabtp.test.repository.RefActeGestionRepository;
import fr.smabtp.test.service.RefActeGestionService;
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
import java.util.List;

import static fr.smabtp.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RefActeGestionResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class RefActeGestionResourceIT {

    private static final String DEFAULT_RAG_CODE = "AAAAAAAAAA";
    private static final String UPDATED_RAG_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_RAG_LIB_COURT = "AAAAAAAAAA";
    private static final String UPDATED_RAG_LIB_COURT = "BBBBBBBBBB";

    private static final String DEFAULT_RAG_LIB_LONG = "AAAAAAAAAA";
    private static final String UPDATED_RAG_LIB_LONG = "BBBBBBBBBB";

    private static final String DEFAULT_RAG_COMM = "AAAAAAAAAA";
    private static final String UPDATED_RAG_COMM = "BBBBBBBBBB";

    @Autowired
    private RefActeGestionRepository refActeGestionRepository;

    @Autowired
    private RefActeGestionService refActeGestionService;

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

    private MockMvc restRefActeGestionMockMvc;

    private RefActeGestion refActeGestion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RefActeGestionResource refActeGestionResource = new RefActeGestionResource(refActeGestionService);
        this.restRefActeGestionMockMvc = MockMvcBuilders.standaloneSetup(refActeGestionResource)
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
    public static RefActeGestion createEntity(EntityManager em) {
        RefActeGestion refActeGestion = new RefActeGestion()
            .ragCode(DEFAULT_RAG_CODE)
            .ragLibCourt(DEFAULT_RAG_LIB_COURT)
            .ragLibLong(DEFAULT_RAG_LIB_LONG)
            .ragComm(DEFAULT_RAG_COMM);
        return refActeGestion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefActeGestion createUpdatedEntity(EntityManager em) {
        RefActeGestion refActeGestion = new RefActeGestion()
            .ragCode(UPDATED_RAG_CODE)
            .ragLibCourt(UPDATED_RAG_LIB_COURT)
            .ragLibLong(UPDATED_RAG_LIB_LONG)
            .ragComm(UPDATED_RAG_COMM);
        return refActeGestion;
    }

    @BeforeEach
    public void initTest() {
        refActeGestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefActeGestion() throws Exception {
        int databaseSizeBeforeCreate = refActeGestionRepository.findAll().size();

        // Create the RefActeGestion
        restRefActeGestionMockMvc.perform(post("/api/ref-acte-gestions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refActeGestion)))
            .andExpect(status().isCreated());

        // Validate the RefActeGestion in the database
        List<RefActeGestion> refActeGestionList = refActeGestionRepository.findAll();
        assertThat(refActeGestionList).hasSize(databaseSizeBeforeCreate + 1);
        RefActeGestion testRefActeGestion = refActeGestionList.get(refActeGestionList.size() - 1);
        assertThat(testRefActeGestion.getRagCode()).isEqualTo(DEFAULT_RAG_CODE);
        assertThat(testRefActeGestion.getRagLibCourt()).isEqualTo(DEFAULT_RAG_LIB_COURT);
        assertThat(testRefActeGestion.getRagLibLong()).isEqualTo(DEFAULT_RAG_LIB_LONG);
        assertThat(testRefActeGestion.getRagComm()).isEqualTo(DEFAULT_RAG_COMM);
    }

    @Test
    @Transactional
    public void createRefActeGestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refActeGestionRepository.findAll().size();

        // Create the RefActeGestion with an existing ID
        refActeGestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefActeGestionMockMvc.perform(post("/api/ref-acte-gestions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refActeGestion)))
            .andExpect(status().isBadRequest());

        // Validate the RefActeGestion in the database
        List<RefActeGestion> refActeGestionList = refActeGestionRepository.findAll();
        assertThat(refActeGestionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefActeGestions() throws Exception {
        // Initialize the database
        refActeGestionRepository.saveAndFlush(refActeGestion);

        // Get all the refActeGestionList
        restRefActeGestionMockMvc.perform(get("/api/ref-acte-gestions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refActeGestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].ragCode").value(hasItem(DEFAULT_RAG_CODE.toString())))
            .andExpect(jsonPath("$.[*].ragLibCourt").value(hasItem(DEFAULT_RAG_LIB_COURT.toString())))
            .andExpect(jsonPath("$.[*].ragLibLong").value(hasItem(DEFAULT_RAG_LIB_LONG.toString())))
            .andExpect(jsonPath("$.[*].ragComm").value(hasItem(DEFAULT_RAG_COMM.toString())));
    }
    
    @Test
    @Transactional
    public void getRefActeGestion() throws Exception {
        // Initialize the database
        refActeGestionRepository.saveAndFlush(refActeGestion);

        // Get the refActeGestion
        restRefActeGestionMockMvc.perform(get("/api/ref-acte-gestions/{id}", refActeGestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(refActeGestion.getId().intValue()))
            .andExpect(jsonPath("$.ragCode").value(DEFAULT_RAG_CODE.toString()))
            .andExpect(jsonPath("$.ragLibCourt").value(DEFAULT_RAG_LIB_COURT.toString()))
            .andExpect(jsonPath("$.ragLibLong").value(DEFAULT_RAG_LIB_LONG.toString()))
            .andExpect(jsonPath("$.ragComm").value(DEFAULT_RAG_COMM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRefActeGestion() throws Exception {
        // Get the refActeGestion
        restRefActeGestionMockMvc.perform(get("/api/ref-acte-gestions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefActeGestion() throws Exception {
        // Initialize the database
        refActeGestionService.save(refActeGestion);

        int databaseSizeBeforeUpdate = refActeGestionRepository.findAll().size();

        // Update the refActeGestion
        RefActeGestion updatedRefActeGestion = refActeGestionRepository.findById(refActeGestion.getId()).get();
        // Disconnect from session so that the updates on updatedRefActeGestion are not directly saved in db
        em.detach(updatedRefActeGestion);
        updatedRefActeGestion
            .ragCode(UPDATED_RAG_CODE)
            .ragLibCourt(UPDATED_RAG_LIB_COURT)
            .ragLibLong(UPDATED_RAG_LIB_LONG)
            .ragComm(UPDATED_RAG_COMM);

        restRefActeGestionMockMvc.perform(put("/api/ref-acte-gestions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefActeGestion)))
            .andExpect(status().isOk());

        // Validate the RefActeGestion in the database
        List<RefActeGestion> refActeGestionList = refActeGestionRepository.findAll();
        assertThat(refActeGestionList).hasSize(databaseSizeBeforeUpdate);
        RefActeGestion testRefActeGestion = refActeGestionList.get(refActeGestionList.size() - 1);
        assertThat(testRefActeGestion.getRagCode()).isEqualTo(UPDATED_RAG_CODE);
        assertThat(testRefActeGestion.getRagLibCourt()).isEqualTo(UPDATED_RAG_LIB_COURT);
        assertThat(testRefActeGestion.getRagLibLong()).isEqualTo(UPDATED_RAG_LIB_LONG);
        assertThat(testRefActeGestion.getRagComm()).isEqualTo(UPDATED_RAG_COMM);
    }

    @Test
    @Transactional
    public void updateNonExistingRefActeGestion() throws Exception {
        int databaseSizeBeforeUpdate = refActeGestionRepository.findAll().size();

        // Create the RefActeGestion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefActeGestionMockMvc.perform(put("/api/ref-acte-gestions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refActeGestion)))
            .andExpect(status().isBadRequest());

        // Validate the RefActeGestion in the database
        List<RefActeGestion> refActeGestionList = refActeGestionRepository.findAll();
        assertThat(refActeGestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefActeGestion() throws Exception {
        // Initialize the database
        refActeGestionService.save(refActeGestion);

        int databaseSizeBeforeDelete = refActeGestionRepository.findAll().size();

        // Delete the refActeGestion
        restRefActeGestionMockMvc.perform(delete("/api/ref-acte-gestions/{id}", refActeGestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefActeGestion> refActeGestionList = refActeGestionRepository.findAll();
        assertThat(refActeGestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefActeGestion.class);
        RefActeGestion refActeGestion1 = new RefActeGestion();
        refActeGestion1.setId(1L);
        RefActeGestion refActeGestion2 = new RefActeGestion();
        refActeGestion2.setId(refActeGestion1.getId());
        assertThat(refActeGestion1).isEqualTo(refActeGestion2);
        refActeGestion2.setId(2L);
        assertThat(refActeGestion1).isNotEqualTo(refActeGestion2);
        refActeGestion1.setId(null);
        assertThat(refActeGestion1).isNotEqualTo(refActeGestion2);
    }
}
