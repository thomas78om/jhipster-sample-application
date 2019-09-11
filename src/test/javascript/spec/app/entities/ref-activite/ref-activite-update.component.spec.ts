/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActiviteUpdateComponent } from 'app/entities/ref-activite/ref-activite-update.component';
import { RefActiviteService } from 'app/entities/ref-activite/ref-activite.service';
import { RefActivite } from 'app/shared/model/ref-activite.model';

describe('Component Tests', () => {
  describe('RefActivite Management Update Component', () => {
    let comp: RefActiviteUpdateComponent;
    let fixture: ComponentFixture<RefActiviteUpdateComponent>;
    let service: RefActiviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActiviteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RefActiviteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefActiviteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActiviteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefActivite(123);
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
        const entity = new RefActivite();
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
