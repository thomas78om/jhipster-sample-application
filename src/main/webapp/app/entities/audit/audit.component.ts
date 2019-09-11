import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAudit } from 'app/shared/model/audit.model';
import { AccountService } from 'app/core';
import { AuditService } from './audit.service';

@Component({
  selector: 'jhi-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit, OnDestroy {
  audits: IAudit[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected auditService: AuditService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.auditService
      .query()
      .pipe(
        filter((res: HttpResponse<IAudit[]>) => res.ok),
        map((res: HttpResponse<IAudit[]>) => res.body)
      )
      .subscribe(
        (res: IAudit[]) => {
          this.audits = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAudits();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAudit) {
    return item.id;
  }

  registerChangeInAudits() {
    this.eventSubscriber = this.eventManager.subscribe('auditListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
