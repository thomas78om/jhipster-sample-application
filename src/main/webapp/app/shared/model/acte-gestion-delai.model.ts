import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';
import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';
import { IRefActivite } from 'app/shared/model/ref-activite.model';

export interface IActeGestionDelai {
  id?: number;
  racCode?: string;
  ragCode?: string;
  rgaCode?: string;
  agdDelai?: number;
  agdAttente?: number;
  agdComm?: string;
  refGroupeActivite?: IRefGroupeActivite;
  refActeGestion?: IRefActeGestion;
  refActivite?: IRefActivite;
}

export class ActeGestionDelai implements IActeGestionDelai {
  constructor(
    public id?: number,
    public racCode?: string,
    public ragCode?: string,
    public rgaCode?: string,
    public agdDelai?: number,
    public agdAttente?: number,
    public agdComm?: string,
    public refGroupeActivite?: IRefGroupeActivite,
    public refActeGestion?: IRefActeGestion,
    public refActivite?: IRefActivite
  ) {}
}
