import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefActivite } from 'app/shared/model/ref-activite.model';
import { RefActiviteService } from './ref-activite.service';

@Component({
  selector: 'jhi-ref-activite-delete-dialog',
  templateUrl: './ref-activite-delete-dialog.component.html'
})
export class RefActiviteDeleteDialogComponent {
  refActivite: IRefActivite;

  constructor(
    protected refActiviteService: RefActiviteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.refActiviteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'refActiviteListModification',
        content: 'Deleted an refActivite'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ref-activite-delete-popup',
  template: ''
})
export class RefActiviteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refActivite }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RefActiviteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.refActivite = refActivite;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ref-activite', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ref-activite', { outlets: { popup: null } }]);
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
