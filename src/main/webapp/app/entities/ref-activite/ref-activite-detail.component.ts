import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefActivite } from 'app/shared/model/ref-activite.model';

@Component({
  selector: 'jhi-ref-activite-detail',
  templateUrl: './ref-activite-detail.component.html'
})
export class RefActiviteDetailComponent implements OnInit {
  refActivite: IRefActivite;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refActivite }) => {
      this.refActivite = refActivite;
    });
  }

  previousState() {
    window.history.back();
  }
}
