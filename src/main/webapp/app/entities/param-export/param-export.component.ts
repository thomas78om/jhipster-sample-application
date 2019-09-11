import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParamExport } from 'app/shared/model/param-export.model';
import { AccountService } from 'app/core';
import { ParamExportService } from './param-export.service';

@Component({
  selector: 'jhi-param-export',
  templateUrl: './param-export.component.html'
})
export class ParamExportComponent implements OnInit, OnDestroy {
  paramExports: IParamExport[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected paramExportService: ParamExportService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.paramExportService
      .query()
      .pipe(
        filter((res: HttpResponse<IParamExport[]>) => res.ok),
        map((res: HttpResponse<IParamExport[]>) => res.body)
      )
      .subscribe(
        (res: IParamExport[]) => {
          this.paramExports = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInParamExports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParamExport) {
    return item.id;
  }

  registerChangeInParamExports() {
    this.eventSubscriber = this.eventManager.subscribe('paramExportListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
