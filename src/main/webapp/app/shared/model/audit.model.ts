import { Moment } from 'moment';

export interface IAudit {
  id?: number;
  audId?: number;
  audUtilisateur?: string;
  audDescription?: string;
  audDatetime?: Moment;
}

export class Audit implements IAudit {
  constructor(
    public id?: number,
    public audId?: number,
    public audUtilisateur?: string,
    public audDescription?: string,
    public audDatetime?: Moment
  ) {}
}
