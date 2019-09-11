/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ParamExportUpdateComponent } from 'app/entities/param-export/param-export-update.component';
import { ParamExportService } from 'app/entities/param-export/param-export.service';
import { ParamExport } from 'app/shared/model/param-export.model';

describe('Component Tests', () => {
  describe('ParamExport Management Update Component', () => {
    let comp: ParamExportUpdateComponent;
    let fixture: ComponentFixture<ParamExportUpdateComponent>;
    let service: ParamExportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ParamExportUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParamExportUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamExportUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamExportService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamExport(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamExport();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
