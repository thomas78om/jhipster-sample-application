import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAudit } from 'app/shared/model/audit.model';

@Component({
  selector: 'jhi-audit-detail',
  templateUrl: './audit-detail.component.html'
})
export class AuditDetailComponent implements OnInit {
  audit: IAudit;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ audit }) => {
      this.audit = audit;
    });
  }

  previousState() {
    window.history.back();
  }
}
