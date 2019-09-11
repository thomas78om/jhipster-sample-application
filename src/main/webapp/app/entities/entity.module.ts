import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ref-groupe-activite',
        loadChildren: () =>
          import('./ref-groupe-activite/ref-groupe-activite.module').then(m => m.JhipsterSampleApplicationRefGroupeActiviteModule)
      },
      {
        path: 'ref-acte-gestion',
        loadChildren: () => import('./ref-acte-gestion/ref-acte-gestion.module').then(m => m.JhipsterSampleApplicationRefActeGestionModule)
      },
      {
        path: 'ref-activite',
        loadChildren: () => import('./ref-activite/ref-activite.module').then(m => m.JhipsterSampleApplicationRefActiviteModule)
      },
      {
        path: 'acte-gestion-delai',
        loadChildren: () =>
          import('./acte-gestion-delai/acte-gestion-delai.module').then(m => m.JhipsterSampleApplicationActeGestionDelaiModule)
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.JhipsterSampleApplicationAuditModule)
      },
      {
        path: 'param-export',
        loadChildren: () => import('./param-export/param-export.module').then(m => m.JhipsterSampleApplicationParamExportModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
