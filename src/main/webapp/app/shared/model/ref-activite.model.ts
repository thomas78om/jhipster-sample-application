import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

export interface IRefActivite {
  id?: number;
  racCode?: string;
  racLibCourt?: string;
  racLibLong?: string;
  racComm?: string;
  acteGestionDelais?: IActeGestionDelai[];
}

export class RefActivite implements IRefActivite {
  constructor(
    public id?: number,
    public racCode?: string,
    public racLibCourt?: string,
    public racLibLong?: string,
    public racComm?: string,
    public acteGestionDelais?: IActeGestionDelai[]
  ) {}
}
