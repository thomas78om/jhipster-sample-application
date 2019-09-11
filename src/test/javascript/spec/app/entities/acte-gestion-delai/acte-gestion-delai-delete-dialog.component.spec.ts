/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ActeGestionDelaiDeleteDialogComponent } from 'app/entities/acte-gestion-delai/acte-gestion-delai-delete-dialog.component';
import { ActeGestionDelaiService } from 'app/entities/acte-gestion-delai/acte-gestion-delai.service';

describe('Component Tests', () => {
  describe('ActeGestionDelai Management Delete Component', () => {
    let comp: ActeGestionDelaiDeleteDialogComponent;
    let fixture: ComponentFixture<ActeGestionDelaiDeleteDialogComponent>;
    let service: ActeGestionDelaiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ActeGestionDelaiDeleteDialogComponent]
      })
        .overrideTemplate(ActeGestionDelaiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActeGestionDelaiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActeGestionDelaiService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
