/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ActeGestionDelaiDetailComponent } from 'app/entities/acte-gestion-delai/acte-gestion-delai-detail.component';
import { ActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

describe('Component Tests', () => {
  describe('ActeGestionDelai Management Detail Component', () => {
    let comp: ActeGestionDelaiDetailComponent;
    let fixture: ComponentFixture<ActeGestionDelaiDetailComponent>;
    const route = ({ data: of({ acteGestionDelai: new ActeGestionDelai(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ActeGestionDelaiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ActeGestionDelaiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActeGestionDelaiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.acteGestionDelai).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
