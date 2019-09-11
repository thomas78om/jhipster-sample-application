import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

type EntityResponseType = HttpResponse<IActeGestionDelai>;
type EntityArrayResponseType = HttpResponse<IActeGestionDelai[]>;

@Injectable({ providedIn: 'root' })
export class ActeGestionDelaiService {
  public resourceUrl = SERVER_API_URL + 'api/acte-gestion-delais';

  constructor(protected http: HttpClient) {}

  create(acteGestionDelai: IActeGestionDelai): Observable<EntityResponseType> {
    return this.http.post<IActeGestionDelai>(this.resourceUrl, acteGestionDelai, { observe: 'response' });
  }

  update(acteGestionDelai: IActeGestionDelai): Observable<EntityResponseType> {
    return this.http.put<IActeGestionDelai>(this.resourceUrl, acteGestionDelai, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActeGestionDelai>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActeGestionDelai[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
