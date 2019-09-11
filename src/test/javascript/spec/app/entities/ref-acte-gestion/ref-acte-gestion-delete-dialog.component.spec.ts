/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActeGestionDeleteDialogComponent } from 'app/entities/ref-acte-gestion/ref-acte-gestion-delete-dialog.component';
import { RefActeGestionService } from 'app/entities/ref-acte-gestion/ref-acte-gestion.service';

describe('Component Tests', () => {
  describe('RefActeGestion Management Delete Component', () => {
    let comp: RefActeGestionDeleteDialogComponent;
    let fixture: ComponentFixture<RefActeGestionDeleteDialogComponent>;
    let service: RefActeGestionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActeGestionDeleteDialogComponent]
      })
        .overrideTemplate(RefActeGestionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefActeGestionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActeGestionService);
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
