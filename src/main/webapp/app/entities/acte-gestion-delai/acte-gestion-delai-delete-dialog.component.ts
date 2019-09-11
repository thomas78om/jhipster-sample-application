import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';
import { ActeGestionDelaiService } from './acte-gestion-delai.service';

@Component({
  selector: 'jhi-acte-gestion-delai-delete-dialog',
  templateUrl: './acte-gestion-delai-delete-dialog.component.html'
})
export class ActeGestionDelaiDeleteDialogComponent {
  acteGestionDelai: IActeGestionDelai;

  constructor(
    protected acteGestionDelaiService: ActeGestionDelaiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.acteGestionDelaiService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'acteGestionDelaiListModification',
        content: 'Deleted an acteGestionDelai'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-acte-gestion-delai-delete-popup',
  template: ''
})
export class ActeGestionDelaiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ acteGestionDelai }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ActeGestionDelaiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.acteGestionDelai = acteGestionDelai;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/acte-gestion-delai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/acte-gestion-delai', { outlets: { popup: null } }]);
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
