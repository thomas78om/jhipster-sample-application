import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParamExport } from 'app/shared/model/param-export.model';

type EntityResponseType = HttpResponse<IParamExport>;
type EntityArrayResponseType = HttpResponse<IParamExport[]>;

@Injectable({ providedIn: 'root' })
export class ParamExportService {
  public resourceUrl = SERVER_API_URL + 'api/param-exports';

  constructor(protected http: HttpClient) {}

  create(paramExport: IParamExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramExport);
    return this.http
      .post<IParamExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paramExport: IParamExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramExport);
    return this.http
      .put<IParamExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParamExport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParamExport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paramExport: IParamExport): IParamExport {
    const copy: IParamExport = Object.assign({}, paramExport, {
      pexDtlastexport:
        paramExport.pexDtlastexport != null && paramExport.pexDtlastexport.isValid()
          ? paramExport.pexDtlastexport.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.pexDtlastexport = res.body.pexDtlastexport != null ? moment(res.body.pexDtlastexport) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paramExport: IParamExport) => {
        paramExport.pexDtlastexport = paramExport.pexDtlastexport != null ? moment(paramExport.pexDtlastexport) : null;
      });
    }
    return res;
  }
}
