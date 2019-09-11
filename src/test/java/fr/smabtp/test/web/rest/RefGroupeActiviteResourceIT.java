package fr.smabtp.test.web.rest;

import fr.smabtp.test.JhipsterSampleApplicationApp;
import fr.smabtp.test.domain.RefGroupeActivite;
import fr.smabtp.test.repository.RefGroupeActiviteRepository;
import fr.smabtp.test.service.RefGroupeActiviteService;
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
 * Integration tests for the {@link RefGroupeActiviteResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class RefGroupeActiviteResourceIT {

    private static final String DEFAULT_RGA_CODE = "AAAAAAAAAA";
    private static final String UPDATED_RGA_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_RGA_LIB_COURT = "AAAAAAAAAA";
    private static final String UPDATED_RGA_LIB_COURT = "BBBBBBBBBB";

    private static final String DEFAULT_RGA_LIB_LONG = "AAAAAAAAAA";
    private static final String UPDATED_RGA_LIB_LONG = "BBBBBBBBBB";

    private static final String DEFAULT_RGA_COMM = "AAAAAAAAAA";
    private static final String UPDATED_RGA_COMM = "BBBBBBBBBB";

    @Autowired
    private RefGroupeActiviteRepository refGroupeActiviteRepository;

    @Autowired
    private RefGroupeActiviteService refGroupeActiviteService;

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

    private MockMvc restRefGroupeActiviteMockMvc;

    private RefGroupeActivite refGroupeActivite;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RefGroupeActiviteResource refGroupeActiviteResource = new RefGroupeActiviteResource(refGroupeActiviteService);
        this.restRefGroupeActiviteMockMvc = MockMvcBuilders.standaloneSetup(refGroupeActiviteResource)
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
    public static RefGroupeActivite createEntity(EntityManager em) {
        RefGroupeActivite refGroupeActivite = new RefGroupeActivite()
            .rgaCode(DEFAULT_RGA_CODE)
            .rgaLibCourt(DEFAULT_RGA_LIB_COURT)
            .rgaLibLong(DEFAULT_RGA_LIB_LONG)
            .rgaComm(DEFAULT_RGA_COMM);
        return refGroupeActivite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGroupeActivite createUpdatedEntity(EntityManager em) {
        RefGroupeActivite refGroupeActivite = new RefGroupeActivite()
            .rgaCode(UPDATED_RGA_CODE)
            .rgaLibCourt(UPDATED_RGA_LIB_COURT)
            .rgaLibLong(UPDATED_RGA_LIB_LONG)
            .rgaComm(UPDATED_RGA_COMM);
        return refGroupeActivite;
    }

    @BeforeEach
    public void initTest() {
        refGroupeActivite = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGroupeActivite() throws Exception {
        int databaseSizeBeforeCreate = refGroupeActiviteRepository.findAll().size();

        // Create the RefGroupeActivite
        restRefGroupeActiviteMockMvc.perform(post("/api/ref-groupe-activites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refGroupeActivite)))
            .andExpect(status().isCreated());

        // Validate the RefGroupeActivite in the database
        List<RefGroupeActivite> refGroupeActiviteList = refGroupeActiviteRepository.findAll();
        assertThat(refGroupeActiviteList).hasSize(databaseSizeBeforeCreate + 1);
        RefGroupeActivite testRefGroupeActivite = refGroupeActiviteList.get(refGroupeActiviteList.size() - 1);
        assertThat(testRefGroupeActivite.getRgaCode()).isEqualTo(DEFAULT_RGA_CODE);
        assertThat(testRefGroupeActivite.getRgaLibCourt()).isEqualTo(DEFAULT_RGA_LIB_COURT);
        assertThat(testRefGroupeActivite.getRgaLibLong()).isEqualTo(DEFAULT_RGA_LIB_LONG);
        assertThat(testRefGroupeActivite.getRgaComm()).isEqualTo(DEFAULT_RGA_COMM);
    }

    @Test
    @Transactional
    public void createRefGroupeActiviteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGroupeActiviteRepository.findAll().size();

        // Create the RefGroupeActivite with an existing ID
        refGroupeActivite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGroupeActiviteMockMvc.perform(post("/api/ref-groupe-activites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refGroupeActivite)))
            .andExpect(status().isBadRequest());

        // Validate the RefGroupeActivite in the database
        List<RefGroupeActivite> refGroupeActiviteList = refGroupeActiviteRepository.findAll();
        assertThat(refGroupeActiviteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGroupeActivites() throws Exception {
        // Initialize the database
        refGroupeActiviteRepository.saveAndFlush(refGroupeActivite);

        // Get all the refGroupeActiviteList
        restRefGroupeActiviteMockMvc.perform(get("/api/ref-groupe-activites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGroupeActivite.getId().intValue())))
            .andExpect(jsonPath("$.[*].rgaCode").value(hasItem(DEFAULT_RGA_CODE.toString())))
            .andExpect(jsonPath("$.[*].rgaLibCourt").value(hasItem(DEFAULT_RGA_LIB_COURT.toString())))
            .andExpect(jsonPath("$.[*].rgaLibLong").value(hasItem(DEFAULT_RGA_LIB_LONG.toString())))
            .andExpect(jsonPath("$.[*].rgaComm").value(hasItem(DEFAULT_RGA_COMM.toString())));
    }
    
    @Test
    @Transactional
    public void getRefGroupeActivite() throws Exception {
        // Initialize the database
        refGroupeActiviteRepository.saveAndFlush(refGroupeActivite);

        // Get the refGroupeActivite
        restRefGroupeActiviteMockMvc.perform(get("/api/ref-groupe-activites/{id}", refGroupeActivite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(refGroupeActivite.getId().intValue()))
            .andExpect(jsonPath("$.rgaCode").value(DEFAULT_RGA_CODE.toString()))
            .andExpect(jsonPath("$.rgaLibCourt").value(DEFAULT_RGA_LIB_COURT.toString()))
            .andExpect(jsonPath("$.rgaLibLong").value(DEFAULT_RGA_LIB_LONG.toString()))
            .andExpect(jsonPath("$.rgaComm").value(DEFAULT_RGA_COMM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRefGroupeActivite() throws Exception {
        // Get the refGroupeActivite
        restRefGroupeActiviteMockMvc.perform(get("/api/ref-groupe-activites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGroupeActivite() throws Exception {
        // Initialize the database
        refGroupeActiviteService.save(refGroupeActivite);

        int databaseSizeBeforeUpdate = refGroupeActiviteRepository.findAll().size();

        // Update the refGroupeActivite
        RefGroupeActivite updatedRefGroupeActivite = refGroupeActiviteRepository.findById(refGroupeActivite.getId()).get();
        // Disconnect from session so that the updates on updatedRefGroupeActivite are not directly saved in db
        em.detach(updatedRefGroupeActivite);
        updatedRefGroupeActivite
            .rgaCode(UPDATED_RGA_CODE)
            .rgaLibCourt(UPDATED_RGA_LIB_COURT)
            .rgaLibLong(UPDATED_RGA_LIB_LONG)
            .rgaComm(UPDATED_RGA_COMM);

        restRefGroupeActiviteMockMvc.perform(put("/api/ref-groupe-activites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGroupeActivite)))
            .andExpect(status().isOk());

        // Validate the RefGroupeActivite in the database
        List<RefGroupeActivite> refGroupeActiviteList = refGroupeActiviteRepository.findAll();
        assertThat(refGroupeActiviteList).hasSize(databaseSizeBeforeUpdate);
        RefGroupeActivite testRefGroupeActivite = refGroupeActiviteList.get(refGroupeActiviteList.size() - 1);
        assertThat(testRefGroupeActivite.getRgaCode()).isEqualTo(UPDATED_RGA_CODE);
        assertThat(testRefGroupeActivite.getRgaLibCourt()).isEqualTo(UPDATED_RGA_LIB_COURT);
        assertThat(testRefGroupeActivite.getRgaLibLong()).isEqualTo(UPDATED_RGA_LIB_LONG);
        assertThat(testRefGroupeActivite.getRgaComm()).isEqualTo(UPDATED_RGA_COMM);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGroupeActivite() throws Exception {
        int databaseSizeBeforeUpdate = refGroupeActiviteRepository.findAll().size();

        // Create the RefGroupeActivite

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGroupeActiviteMockMvc.perform(put("/api/ref-groupe-activites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(refGroupeActivite)))
            .andExpect(status().isBadRequest());

        // Validate the RefGroupeActivite in the database
        List<RefGroupeActivite> refGroupeActiviteList = refGroupeActiviteRepository.findAll();
        assertThat(refGroupeActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGroupeActivite() throws Exception {
        // Initialize the database
        refGroupeActiviteService.save(refGroupeActivite);

        int databaseSizeBeforeDelete = refGroupeActiviteRepository.findAll().size();

        // Delete the refGroupeActivite
        restRefGroupeActiviteMockMvc.perform(delete("/api/ref-groupe-activites/{id}", refGroupeActivite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGroupeActivite> refGroupeActiviteList = refGroupeActiviteRepository.findAll();
        assertThat(refGroupeActiviteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGroupeActivite.class);
        RefGroupeActivite refGroupeActivite1 = new RefGroupeActivite();
        refGroupeActivite1.setId(1L);
        RefGroupeActivite refGroupeActivite2 = new RefGroupeActivite();
        refGroupeActivite2.setId(refGroupeActivite1.getId());
        assertThat(refGroupeActivite1).isEqualTo(refGroupeActivite2);
        refGroupeActivite2.setId(2L);
        assertThat(refGroupeActivite1).isNotEqualTo(refGroupeActivite2);
        refGroupeActivite1.setId(null);
        assertThat(refGroupeActivite1).isNotEqualTo(refGroupeActivite2);
    }
}
