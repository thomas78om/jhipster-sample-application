import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRefActivite, RefActivite } from 'app/shared/model/ref-activite.model';
import { RefActiviteService } from './ref-activite.service';

@Component({
  selector: 'jhi-ref-activite-update',
  templateUrl: './ref-activite-update.component.html'
})
export class RefActiviteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    racCode: [],
    racLibCourt: [],
    racLibLong: [],
    racComm: []
  });

  constructor(protected refActiviteService: RefActiviteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ refActivite }) => {
      this.updateForm(refActivite);
    });
  }

  updateForm(refActivite: IRefActivite) {
    this.editForm.patchValue({
      id: refActivite.id,
      racCode: refActivite.racCode,
      racLibCourt: refActivite.racLibCourt,
      racLibLong: refActivite.racLibLong,
      racComm: refActivite.racComm
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const refActivite = this.createFromForm();
    if (refActivite.id !== undefined) {
      this.subscribeToSaveResponse(this.refActiviteService.update(refActivite));
    } else {
      this.subscribeToSaveResponse(this.refActiviteService.create(refActivite));
    }
  }

  private createFromForm(): IRefActivite {
    return {
      ...new RefActivite(),
      id: this.editForm.get(['id']).value,
      racCode: this.editForm.get(['racCode']).value,
      racLibCourt: this.editForm.get(['racLibCourt']).value,
      racLibLong: this.editForm.get(['racLibLong']).value,
      racComm: this.editForm.get(['racComm']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefActivite>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
