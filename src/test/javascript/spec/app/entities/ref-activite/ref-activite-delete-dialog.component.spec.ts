/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActiviteDeleteDialogComponent } from 'app/entities/ref-activite/ref-activite-delete-dialog.component';
import { RefActiviteService } from 'app/entities/ref-activite/ref-activite.service';

describe('Component Tests', () => {
  describe('RefActivite Management Delete Component', () => {
    let comp: RefActiviteDeleteDialogComponent;
    let fixture: ComponentFixture<RefActiviteDeleteDialogComponent>;
    let service: RefActiviteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActiviteDeleteDialogComponent]
      })
        .overrideTemplate(RefActiviteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefActiviteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActiviteService);
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
