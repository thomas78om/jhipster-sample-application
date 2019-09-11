/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActeGestionUpdateComponent } from 'app/entities/ref-acte-gestion/ref-acte-gestion-update.component';
import { RefActeGestionService } from 'app/entities/ref-acte-gestion/ref-acte-gestion.service';
import { RefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

describe('Component Tests', () => {
  describe('RefActeGestion Management Update Component', () => {
    let comp: RefActeGestionUpdateComponent;
    let fixture: ComponentFixture<RefActeGestionUpdateComponent>;
    let service: RefActeGestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActeGestionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RefActeGestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefActeGestionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActeGestionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefActeGestion(123);
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
        const entity = new RefActeGestion();
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
