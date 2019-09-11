import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

@Component({
  selector: 'jhi-ref-acte-gestion-detail',
  templateUrl: './ref-acte-gestion-detail.component.html'
})
export class RefActeGestionDetailComponent implements OnInit {
  refActeGestion: IRefActeGestion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refActeGestion }) => {
      this.refActeGestion = refActeGestion;
    });
  }

  previousState() {
    window.history.back();
  }
}
