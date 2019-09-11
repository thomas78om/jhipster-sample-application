/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ParamExportComponent } from 'app/entities/param-export/param-export.component';
import { ParamExportService } from 'app/entities/param-export/param-export.service';
import { ParamExport } from 'app/shared/model/param-export.model';

describe('Component Tests', () => {
  describe('ParamExport Management Component', () => {
    let comp: ParamExportComponent;
    let fixture: ComponentFixture<ParamExportComponent>;
    let service: ParamExportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ParamExportComponent],
        providers: []
      })
        .overrideTemplate(ParamExportComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamExportComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamExportService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParamExport(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paramExports[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
