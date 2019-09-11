import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParamExport } from 'app/shared/model/param-export.model';
import { ParamExportService } from './param-export.service';
import { ParamExportComponent } from './param-export.component';
import { ParamExportDetailComponent } from './param-export-detail.component';
import { ParamExportUpdateComponent } from './param-export-update.component';
import { ParamExportDeletePopupComponent } from './param-export-delete-dialog.component';
import { IParamExport } from 'app/shared/model/param-export.model';

@Injectable({ providedIn: 'root' })
export class ParamExportResolve implements Resolve<IParamExport> {
  constructor(private service: ParamExportService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParamExport> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ParamExport>) => response.ok),
        map((paramExport: HttpResponse<ParamExport>) => paramExport.body)
      );
    }
    return of(new ParamExport());
  }
}

export const paramExportRoute: Routes = [
  {
    path: '',
    component: ParamExportComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamExports'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParamExportDetailComponent,
    resolve: {
      paramExport: ParamExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamExports'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParamExportUpdateComponent,
    resolve: {
      paramExport: ParamExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamExports'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParamExportUpdateComponent,
    resolve: {
      paramExport: ParamExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamExports'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paramExportPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParamExportDeletePopupComponent,
    resolve: {
      paramExport: ParamExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamExports'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
