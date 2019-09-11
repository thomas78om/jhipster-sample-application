/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefGroupeActiviteUpdateComponent } from 'app/entities/ref-groupe-activite/ref-groupe-activite-update.component';
import { RefGroupeActiviteService } from 'app/entities/ref-groupe-activite/ref-groupe-activite.service';
import { RefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

describe('Component Tests', () => {
  describe('RefGroupeActivite Management Update Component', () => {
    let comp: RefGroupeActiviteUpdateComponent;
    let fixture: ComponentFixture<RefGroupeActiviteUpdateComponent>;
    let service: RefGroupeActiviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefGroupeActiviteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RefGroupeActiviteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGroupeActiviteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGroupeActiviteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGroupeActivite(123);
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
        const entity = new RefGroupeActivite();
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
