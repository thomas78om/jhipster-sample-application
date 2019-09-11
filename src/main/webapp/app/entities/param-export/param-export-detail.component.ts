import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamExport } from 'app/shared/model/param-export.model';

@Component({
  selector: 'jhi-param-export-detail',
  templateUrl: './param-export-detail.component.html'
})
export class ParamExportDetailComponent implements OnInit {
  paramExport: IParamExport;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramExport }) => {
      this.paramExport = paramExport;
    });
  }

  previousState() {
    window.history.back();
  }
}
