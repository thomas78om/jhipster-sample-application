import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RefActivite } from 'app/shared/model/ref-activite.model';
import { RefActiviteService } from './ref-activite.service';
import { RefActiviteComponent } from './ref-activite.component';
import { RefActiviteDetailComponent } from './ref-activite-detail.component';
import { RefActiviteUpdateComponent } from './ref-activite-update.component';
import { RefActiviteDeletePopupComponent } from './ref-activite-delete-dialog.component';
import { IRefActivite } from 'app/shared/model/ref-activite.model';

@Injectable({ providedIn: 'root' })
export class RefActiviteResolve implements Resolve<IRefActivite> {
  constructor(private service: RefActiviteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRefActivite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RefActivite>) => response.ok),
        map((refActivite: HttpResponse<RefActivite>) => refActivite.body)
      );
    }
    return of(new RefActivite());
  }
}

export const refActiviteRoute: Routes = [
  {
    path: '',
    component: RefActiviteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RefActiviteDetailComponent,
    resolve: {
      refActivite: RefActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RefActiviteUpdateComponent,
    resolve: {
      refActivite: RefActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RefActiviteUpdateComponent,
    resolve: {
      refActivite: RefActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActivites'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const refActivitePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RefActiviteDeletePopupComponent,
    resolve: {
      refActivite: RefActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActivites'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
