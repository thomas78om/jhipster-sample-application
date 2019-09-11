import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IActeGestionDelai, ActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';
import { ActeGestionDelaiService } from './acte-gestion-delai.service';
import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';
import { RefGroupeActiviteService } from 'app/entities/ref-groupe-activite';
import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { RefActeGestionService } from 'app/entities/ref-acte-gestion';
import { IRefActivite } from 'app/shared/model/ref-activite.model';
import { RefActiviteService } from 'app/entities/ref-activite';

@Component({
  selector: 'jhi-acte-gestion-delai-update',
  templateUrl: './acte-gestion-delai-update.component.html'
})
export class ActeGestionDelaiUpdateComponent implements OnInit {
  isSaving: boolean;

  refgroupeactivites: IRefGroupeActivite[];

  refactegestions: IRefActeGestion[];

  refactivites: IRefActivite[];

  editForm = this.fb.group({
    id: [],
    racCode: [],
    ragCode: [],
    rgaCode: [],
    agdDelai: [],
    agdAttente: [],
    agdComm: [],
    refGroupeActivite: [],
    refActeGestion: [],
    refActivite: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected acteGestionDelaiService: ActeGestionDelaiService,
    protected refGroupeActiviteService: RefGroupeActiviteService,
    protected refActeGestionService: RefActeGestionService,
    protected refActiviteService: RefActiviteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ acteGestionDelai }) => {
      this.updateForm(acteGestionDelai);
    });
    this.refGroupeActiviteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRefGroupeActivite[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRefGroupeActivite[]>) => response.body)
      )
      .subscribe((res: IRefGroupeActivite[]) => (this.refgroupeactivites = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.refActeGestionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRefActeGestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRefActeGestion[]>) => response.body)
      )
      .subscribe((res: IRefActeGestion[]) => (this.refactegestions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.refActiviteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRefActivite[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRefActivite[]>) => response.body)
      )
      .subscribe((res: IRefActivite[]) => (this.refactivites = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(acteGestionDelai: IActeGestionDelai) {
    this.editForm.patchValue({
      id: acteGestionDelai.id,
      racCode: acteGestionDelai.racCode,
      ragCode: acteGestionDelai.ragCode,
      rgaCode: acteGestionDelai.rgaCode,
      agdDelai: acteGestionDelai.agdDelai,
      agdAttente: acteGestionDelai.agdAttente,
      agdComm: acteGestionDelai.agdComm,
      refGroupeActivite: acteGestionDelai.refGroupeActivite,
      refActeGestion: acteGestionDelai.refActeGestion,
      refActivite: acteGestionDelai.refActivite
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const acteGestionDelai = this.createFromForm();
    if (acteGestionDelai.id !== undefined) {
      this.subscribeToSaveResponse(this.acteGestionDelaiService.update(acteGestionDelai));
    } else {
      this.subscribeToSaveResponse(this.acteGestionDelaiService.create(acteGestionDelai));
    }
  }

  private createFromForm(): IActeGestionDelai {
    return {
      ...new ActeGestionDelai(),
      id: this.editForm.get(['id']).value,
      racCode: this.editForm.get(['racCode']).value,
      ragCode: this.editForm.get(['ragCode']).value,
      rgaCode: this.editForm.get(['rgaCode']).value,
      agdDelai: this.editForm.get(['agdDelai']).value,
      agdAttente: this.editForm.get(['agdAttente']).value,
      agdComm: this.editForm.get(['agdComm']).value,
      refGroupeActivite: this.editForm.get(['refGroupeActivite']).value,
      refActeGestion: this.editForm.get(['refActeGestion']).value,
      refActivite: this.editForm.get(['refActivite']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActeGestionDelai>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRefGroupeActiviteById(index: number, item: IRefGroupeActivite) {
    return item.id;
  }

  trackRefActeGestionById(index: number, item: IRefActeGestion) {
    return item.id;
  }

  trackRefActiviteById(index: number, item: IRefActivite) {
    return item.id;
  }
}
