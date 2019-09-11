/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefGroupeActiviteDetailComponent } from 'app/entities/ref-groupe-activite/ref-groupe-activite-detail.component';
import { RefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

describe('Component Tests', () => {
  describe('RefGroupeActivite Management Detail Component', () => {
    let comp: RefGroupeActiviteDetailComponent;
    let fixture: ComponentFixture<RefGroupeActiviteDetailComponent>;
    const route = ({ data: of({ refGroupeActivite: new RefGroupeActivite(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefGroupeActiviteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RefGroupeActiviteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGroupeActiviteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGroupeActivite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
