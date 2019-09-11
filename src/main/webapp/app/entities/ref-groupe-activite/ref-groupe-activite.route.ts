import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';
import { RefGroupeActiviteService } from './ref-groupe-activite.service';
import { RefGroupeActiviteComponent } from './ref-groupe-activite.component';
import { RefGroupeActiviteDetailComponent } from './ref-groupe-activite-detail.component';
import { RefGroupeActiviteUpdateComponent } from './ref-groupe-activite-update.component';
import { RefGroupeActiviteDeletePopupComponent } from './ref-groupe-activite-delete-dialog.component';
import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

@Injectable({ providedIn: 'root' })
export class RefGroupeActiviteResolve implements Resolve<IRefGroupeActivite> {
  constructor(private service: RefGroupeActiviteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRefGroupeActivite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RefGroupeActivite>) => response.ok),
        map((refGroupeActivite: HttpResponse<RefGroupeActivite>) => refGroupeActivite.body)
      );
    }
    return of(new RefGroupeActivite());
  }
}

export const refGroupeActiviteRoute: Routes = [
  {
    path: '',
    component: RefGroupeActiviteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefGroupeActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RefGroupeActiviteDetailComponent,
    resolve: {
      refGroupeActivite: RefGroupeActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefGroupeActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RefGroupeActiviteUpdateComponent,
    resolve: {
      refGroupeActivite: RefGroupeActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefGroupeActivites'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RefGroupeActiviteUpdateComponent,
    resolve: {
      refGroupeActivite: RefGroupeActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefGroupeActivites'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const refGroupeActivitePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RefGroupeActiviteDeletePopupComponent,
    resolve: {
      refGroupeActivite: RefGroupeActiviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefGroupeActivites'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
