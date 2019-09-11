/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActeGestionDetailComponent } from 'app/entities/ref-acte-gestion/ref-acte-gestion-detail.component';
import { RefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

describe('Component Tests', () => {
  describe('RefActeGestion Management Detail Component', () => {
    let comp: RefActeGestionDetailComponent;
    let fixture: ComponentFixture<RefActeGestionDetailComponent>;
    const route = ({ data: of({ refActeGestion: new RefActeGestion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActeGestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RefActeGestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefActeGestionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refActeGestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
