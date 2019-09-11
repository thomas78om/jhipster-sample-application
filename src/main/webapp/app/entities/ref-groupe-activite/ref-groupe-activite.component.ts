import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';
import { AccountService } from 'app/core';
import { RefGroupeActiviteService } from './ref-groupe-activite.service';

@Component({
  selector: 'jhi-ref-groupe-activite',
  templateUrl: './ref-groupe-activite.component.html'
})
export class RefGroupeActiviteComponent implements OnInit, OnDestroy {
  refGroupeActivites: IRefGroupeActivite[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected refGroupeActiviteService: RefGroupeActiviteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.refGroupeActiviteService
      .query()
      .pipe(
        filter((res: HttpResponse<IRefGroupeActivite[]>) => res.ok),
        map((res: HttpResponse<IRefGroupeActivite[]>) => res.body)
      )
      .subscribe(
        (res: IRefGroupeActivite[]) => {
          this.refGroupeActivites = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRefGroupeActivites();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRefGroupeActivite) {
    return item.id;
  }

  registerChangeInRefGroupeActivites() {
    this.eventSubscriber = this.eventManager.subscribe('refGroupeActiviteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
