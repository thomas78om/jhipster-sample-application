import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { RefActeGestionService } from './ref-acte-gestion.service';
import { RefActeGestionComponent } from './ref-acte-gestion.component';
import { RefActeGestionDetailComponent } from './ref-acte-gestion-detail.component';
import { RefActeGestionUpdateComponent } from './ref-acte-gestion-update.component';
import { RefActeGestionDeletePopupComponent } from './ref-acte-gestion-delete-dialog.component';
import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

@Injectable({ providedIn: 'root' })
export class RefActeGestionResolve implements Resolve<IRefActeGestion> {
  constructor(private service: RefActeGestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRefActeGestion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RefActeGestion>) => response.ok),
        map((refActeGestion: HttpResponse<RefActeGestion>) => refActeGestion.body)
      );
    }
    return of(new RefActeGestion());
  }
}

export const refActeGestionRoute: Routes = [
  {
    path: '',
    component: RefActeGestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActeGestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RefActeGestionDetailComponent,
    resolve: {
      refActeGestion: RefActeGestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActeGestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RefActeGestionUpdateComponent,
    resolve: {
      refActeGestion: RefActeGestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActeGestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RefActeGestionUpdateComponent,
    resolve: {
      refActeGestion: RefActeGestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActeGestions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const refActeGestionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RefActeGestionDeletePopupComponent,
    resolve: {
      refActeGestion: RefActeGestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RefActeGestions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
