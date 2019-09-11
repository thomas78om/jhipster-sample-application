import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { AccountService } from 'app/core';
import { RefActeGestionService } from './ref-acte-gestion.service';

@Component({
  selector: 'jhi-ref-acte-gestion',
  templateUrl: './ref-acte-gestion.component.html'
})
export class RefActeGestionComponent implements OnInit, OnDestroy {
  refActeGestions: IRefActeGestion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected refActeGestionService: RefActeGestionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.refActeGestionService
      .query()
      .pipe(
        filter((res: HttpResponse<IRefActeGestion[]>) => res.ok),
        map((res: HttpResponse<IRefActeGestion[]>) => res.body)
      )
      .subscribe(
        (res: IRefActeGestion[]) => {
          this.refActeGestions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRefActeGestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRefActeGestion) {
    return item.id;
  }

  registerChangeInRefActeGestions() {
    this.eventSubscriber = this.eventManager.subscribe('refActeGestionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
