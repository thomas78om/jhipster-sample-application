import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  RefGroupeActiviteComponent,
  RefGroupeActiviteDetailComponent,
  RefGroupeActiviteUpdateComponent,
  RefGroupeActiviteDeletePopupComponent,
  RefGroupeActiviteDeleteDialogComponent,
  refGroupeActiviteRoute,
  refGroupeActivitePopupRoute
} from './';

const ENTITY_STATES = [...refGroupeActiviteRoute, ...refGroupeActivitePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RefGroupeActiviteComponent,
    RefGroupeActiviteDetailComponent,
    RefGroupeActiviteUpdateComponent,
    RefGroupeActiviteDeleteDialogComponent,
    RefGroupeActiviteDeletePopupComponent
  ],
  entryComponents: [
    RefGroupeActiviteComponent,
    RefGroupeActiviteUpdateComponent,
    RefGroupeActiviteDeleteDialogComponent,
    RefGroupeActiviteDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationRefGroupeActiviteModule {}
