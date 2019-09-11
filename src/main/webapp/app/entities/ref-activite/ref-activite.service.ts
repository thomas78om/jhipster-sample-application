import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRefActivite } from 'app/shared/model/ref-activite.model';

type EntityResponseType = HttpResponse<IRefActivite>;
type EntityArrayResponseType = HttpResponse<IRefActivite[]>;

@Injectable({ providedIn: 'root' })
export class RefActiviteService {
  public resourceUrl = SERVER_API_URL + 'api/ref-activites';

  constructor(protected http: HttpClient) {}

  create(refActivite: IRefActivite): Observable<EntityResponseType> {
    return this.http.post<IRefActivite>(this.resourceUrl, refActivite, { observe: 'response' });
  }

  update(refActivite: IRefActivite): Observable<EntityResponseType> {
    return this.http.put<IRefActivite>(this.resourceUrl, refActivite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
