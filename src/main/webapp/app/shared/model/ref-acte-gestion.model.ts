import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

export interface IRefActeGestion {
  id?: number;
  ragCode?: string;
  ragLibCourt?: string;
  ragLibLong?: string;
  ragComm?: string;
  acteGestionDelais?: IActeGestionDelai[];
}

export class RefActeGestion implements IRefActeGestion {
  constructor(
    public id?: number,
    public ragCode?: string,
    public ragLibCourt?: string,
    public ragLibLong?: string,
    public ragComm?: string,
    public acteGestionDelais?: IActeGestionDelai[]
  ) {}
}
