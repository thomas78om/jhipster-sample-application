import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

@Component({
  selector: 'jhi-acte-gestion-delai-detail',
  templateUrl: './acte-gestion-delai-detail.component.html'
})
export class ActeGestionDelaiDetailComponent implements OnInit {
  acteGestionDelai: IActeGestionDelai;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ acteGestionDelai }) => {
      this.acteGestionDelai = acteGestionDelai;
    });
  }

  previousState() {
    window.history.back();
  }
}
