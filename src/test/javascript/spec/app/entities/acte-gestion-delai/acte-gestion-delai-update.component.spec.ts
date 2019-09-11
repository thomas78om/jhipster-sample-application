/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ActeGestionDelaiUpdateComponent } from 'app/entities/acte-gestion-delai/acte-gestion-delai-update.component';
import { ActeGestionDelaiService } from 'app/entities/acte-gestion-delai/acte-gestion-delai.service';
import { ActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

describe('Component Tests', () => {
  describe('ActeGestionDelai Management Update Component', () => {
    let comp: ActeGestionDelaiUpdateComponent;
    let fixture: ComponentFixture<ActeGestionDelaiUpdateComponent>;
    let service: ActeGestionDelaiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ActeGestionDelaiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ActeGestionDelaiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActeGestionDelaiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActeGestionDelaiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ActeGestionDelai(123);
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
        const entity = new ActeGestionDelai();
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
