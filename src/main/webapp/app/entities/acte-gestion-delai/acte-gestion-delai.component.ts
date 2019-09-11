import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';
import { AccountService } from 'app/core';
import { ActeGestionDelaiService } from './acte-gestion-delai.service';

@Component({
  selector: 'jhi-acte-gestion-delai',
  templateUrl: './acte-gestion-delai.component.html'
})
export class ActeGestionDelaiComponent implements OnInit, OnDestroy {
  acteGestionDelais: IActeGestionDelai[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected acteGestionDelaiService: ActeGestionDelaiService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.acteGestionDelaiService
      .query()
      .pipe(
        filter((res: HttpResponse<IActeGestionDelai[]>) => res.ok),
        map((res: HttpResponse<IActeGestionDelai[]>) => res.body)
      )
      .subscribe(
        (res: IActeGestionDelai[]) => {
          this.acteGestionDelais = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInActeGestionDelais();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IActeGestionDelai) {
    return item.id;
  }

  registerChangeInActeGestionDelais() {
    this.eventSubscriber = this.eventManager.subscribe('acteGestionDelaiListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
