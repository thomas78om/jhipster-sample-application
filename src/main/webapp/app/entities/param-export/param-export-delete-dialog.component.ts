import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamExport } from 'app/shared/model/param-export.model';
import { ParamExportService } from './param-export.service';

@Component({
  selector: 'jhi-param-export-delete-dialog',
  templateUrl: './param-export-delete-dialog.component.html'
})
export class ParamExportDeleteDialogComponent {
  paramExport: IParamExport;

  constructor(
    protected paramExportService: ParamExportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paramExportService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paramExportListModification',
        content: 'Deleted an paramExport'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-param-export-delete-popup',
  template: ''
})
export class ParamExportDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramExport }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParamExportDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paramExport = paramExport;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/param-export', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/param-export', { outlets: { popup: null } }]);
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
