import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

export interface IRefGroupeActivite {
  id?: number;
  rgaCode?: string;
  rgaLibCourt?: string;
  rgaLibLong?: string;
  rgaComm?: string;
  acteGestionDelais?: IActeGestionDelai[];
}

export class RefGroupeActivite implements IRefGroupeActivite {
  constructor(
    public id?: number,
    public rgaCode?: string,
    public rgaLibCourt?: string,
    public rgaLibLong?: string,
    public rgaComm?: string,
    public acteGestionDelais?: IActeGestionDelai[]
  ) {}
}
