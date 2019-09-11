/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ParamExportDetailComponent } from 'app/entities/param-export/param-export-detail.component';
import { ParamExport } from 'app/shared/model/param-export.model';

describe('Component Tests', () => {
  describe('ParamExport Management Detail Component', () => {
    let comp: ParamExportDetailComponent;
    let fixture: ComponentFixture<ParamExportDetailComponent>;
    const route = ({ data: of({ paramExport: new ParamExport(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ParamExportDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParamExportDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamExportDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramExport).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
