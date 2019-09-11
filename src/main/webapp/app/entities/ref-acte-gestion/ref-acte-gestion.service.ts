import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

type EntityResponseType = HttpResponse<IRefActeGestion>;
type EntityArrayResponseType = HttpResponse<IRefActeGestion[]>;

@Injectable({ providedIn: 'root' })
export class RefActeGestionService {
  public resourceUrl = SERVER_API_URL + 'api/ref-acte-gestions';

  constructor(protected http: HttpClient) {}

  create(refActeGestion: IRefActeGestion): Observable<EntityResponseType> {
    return this.http.post<IRefActeGestion>(this.resourceUrl, refActeGestion, { observe: 'response' });
  }

  update(refActeGestion: IRefActeGestion): Observable<EntityResponseType> {
    return this.http.put<IRefActeGestion>(this.resourceUrl, refActeGestion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefActeGestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefActeGestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
