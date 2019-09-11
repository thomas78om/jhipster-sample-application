import { Moment } from 'moment';

export interface IParamExport {
  id?: number;
  pexPublish?: number;
  pexDtlastexport?: Moment;
}

export class ParamExport implements IParamExport {
  constructor(public id?: number, public pexPublish?: number, public pexDtlastexport?: Moment) {}
}
