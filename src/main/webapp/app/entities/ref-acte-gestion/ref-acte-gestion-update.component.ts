import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRefActeGestion, RefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { RefActeGestionService } from './ref-acte-gestion.service';

@Component({
  selector: 'jhi-ref-acte-gestion-update',
  templateUrl: './ref-acte-gestion-update.component.html'
})
export class RefActeGestionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    ragCode: [],
    ragLibCourt: [],
    ragLibLong: [],
    ragComm: []
  });

  constructor(protected refActeGestionService: RefActeGestionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ refActeGestion }) => {
      this.updateForm(refActeGestion);
    });
  }

  updateForm(refActeGestion: IRefActeGestion) {
    this.editForm.patchValue({
      id: refActeGestion.id,
      ragCode: refActeGestion.ragCode,
      ragLibCourt: refActeGestion.ragLibCourt,
      ragLibLong: refActeGestion.ragLibLong,
      ragComm: refActeGestion.ragComm
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const refActeGestion = this.createFromForm();
    if (refActeGestion.id !== undefined) {
      this.subscribeToSaveResponse(this.refActeGestionService.update(refActeGestion));
    } else {
      this.subscribeToSaveResponse(this.refActeGestionService.create(refActeGestion));
    }
  }

  private createFromForm(): IRefActeGestion {
    return {
      ...new RefActeGestion(),
      id: this.editForm.get(['id']).value,
      ragCode: this.editForm.get(['ragCode']).value,
      ragLibCourt: this.editForm.get(['ragLibCourt']).value,
      ragLibLong: this.editForm.get(['ragLibLong']).value,
      ragComm: this.editForm.get(['ragComm']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefActeGestion>>) {
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
