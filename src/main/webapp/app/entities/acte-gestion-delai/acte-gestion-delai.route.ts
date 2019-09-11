import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';
import { ActeGestionDelaiService } from './acte-gestion-delai.service';
import { ActeGestionDelaiComponent } from './acte-gestion-delai.component';
import { ActeGestionDelaiDetailComponent } from './acte-gestion-delai-detail.component';
import { ActeGestionDelaiUpdateComponent } from './acte-gestion-delai-update.component';
import { ActeGestionDelaiDeletePopupComponent } from './acte-gestion-delai-delete-dialog.component';
import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

@Injectable({ providedIn: 'root' })
export class ActeGestionDelaiResolve implements Resolve<IActeGestionDelai> {
  constructor(private service: ActeGestionDelaiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActeGestionDelai> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ActeGestionDelai>) => response.ok),
        map((acteGestionDelai: HttpResponse<ActeGestionDelai>) => acteGestionDelai.body)
      );
    }
    return of(new ActeGestionDelai());
  }
}

export const acteGestionDelaiRoute: Routes = [
  {
    path: '',
    component: ActeGestionDelaiComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ActeGestionDelais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ActeGestionDelaiDetailComponent,
    resolve: {
      acteGestionDelai: ActeGestionDelaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ActeGestionDelais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ActeGestionDelaiUpdateComponent,
    resolve: {
      acteGestionDelai: ActeGestionDelaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ActeGestionDelais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ActeGestionDelaiUpdateComponent,
    resolve: {
      acteGestionDelai: ActeGestionDelaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ActeGestionDelais'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const acteGestionDelaiPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ActeGestionDelaiDeletePopupComponent,
    resolve: {
      acteGestionDelai: ActeGestionDelaiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ActeGestionDelais'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
