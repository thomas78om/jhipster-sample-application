import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { RefActeGestionService } from './ref-acte-gestion.service';

@Component({
  selector: 'jhi-ref-acte-gestion-delete-dialog',
  templateUrl: './ref-acte-gestion-delete-dialog.component.html'
})
export class RefActeGestionDeleteDialogComponent {
  refActeGestion: IRefActeGestion;

  constructor(
    protected refActeGestionService: RefActeGestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.refActeGestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'refActeGestionListModification',
        content: 'Deleted an refActeGestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ref-acte-gestion-delete-popup',
  template: ''
})
export class RefActeGestionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refActeGestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RefActeGestionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.refActeGestion = refActeGestion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ref-acte-gestion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ref-acte-gestion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
