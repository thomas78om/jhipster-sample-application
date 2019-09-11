/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActiviteDetailComponent } from 'app/entities/ref-activite/ref-activite-detail.component';
import { RefActivite } from 'app/shared/model/ref-activite.model';

describe('Component Tests', () => {
  describe('RefActivite Management Detail Component', () => {
    let comp: RefActiviteDetailComponent;
    let fixture: ComponentFixture<RefActiviteDetailComponent>;
    const route = ({ data: of({ refActivite: new RefActivite(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActiviteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RefActiviteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefActiviteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refActivite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
