import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';
import { RefGroupeActiviteService } from './ref-groupe-activite.service';

@Component({
  selector: 'jhi-ref-groupe-activite-delete-dialog',
  templateUrl: './ref-groupe-activite-delete-dialog.component.html'
})
export class RefGroupeActiviteDeleteDialogComponent {
  refGroupeActivite: IRefGroupeActivite;

  constructor(
    protected refGroupeActiviteService: RefGroupeActiviteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.refGroupeActiviteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'refGroupeActiviteListModification',
        content: 'Deleted an refGroupeActivite'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ref-groupe-activite-delete-popup',
  template: ''
})
export class RefGroupeActiviteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refGroupeActivite }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RefGroupeActiviteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.refGroupeActivite = refGroupeActivite;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ref-groupe-activite', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ref-groupe-activite', { outlets: { popup: null } }]);
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
