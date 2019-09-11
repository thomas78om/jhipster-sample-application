import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  RefActiviteComponent,
  RefActiviteDetailComponent,
  RefActiviteUpdateComponent,
  RefActiviteDeletePopupComponent,
  RefActiviteDeleteDialogComponent,
  refActiviteRoute,
  refActivitePopupRoute
} from './';

const ENTITY_STATES = [...refActiviteRoute, ...refActivitePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RefActiviteComponent,
    RefActiviteDetailComponent,
    RefActiviteUpdateComponent,
    RefActiviteDeleteDialogComponent,
    RefActiviteDeletePopupComponent
  ],
  entryComponents: [RefActiviteComponent, RefActiviteUpdateComponent, RefActiviteDeleteDialogComponent, RefActiviteDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationRefActiviteModule {}
