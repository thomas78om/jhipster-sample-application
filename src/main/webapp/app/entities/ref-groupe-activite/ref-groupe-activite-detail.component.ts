import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

@Component({
  selector: 'jhi-ref-groupe-activite-detail',
  templateUrl: './ref-groupe-activite-detail.component.html'
})
export class RefGroupeActiviteDetailComponent implements OnInit {
  refGroupeActivite: IRefGroupeActivite;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ refGroupeActivite }) => {
      this.refGroupeActivite = refGroupeActivite;
    });
  }

  previousState() {
    window.history.back();
  }
}
