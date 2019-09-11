import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRefActivite } from 'app/shared/model/ref-activite.model';
import { AccountService } from 'app/core';
import { RefActiviteService } from './ref-activite.service';

@Component({
  selector: 'jhi-ref-activite',
  templateUrl: './ref-activite.component.html'
})
export class RefActiviteComponent implements OnInit, OnDestroy {
  refActivites: IRefActivite[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected refActiviteService: RefActiviteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.refActiviteService
      .query()
      .pipe(
        filter((res: HttpResponse<IRefActivite[]>) => res.ok),
        map((res: HttpResponse<IRefActivite[]>) => res.body)
      )
      .subscribe(
        (res: IRefActivite[]) => {
          this.refActivites = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRefActivites();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRefActivite) {
    return item.id;
  }

  registerChangeInRefActivites() {
    this.eventSubscriber = this.eventManager.subscribe('refActiviteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
