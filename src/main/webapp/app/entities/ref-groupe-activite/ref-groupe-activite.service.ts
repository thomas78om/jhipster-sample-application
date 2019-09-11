import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

type EntityResponseType = HttpResponse<IRefGroupeActivite>;
type EntityArrayResponseType = HttpResponse<IRefGroupeActivite[]>;

@Injectable({ providedIn: 'root' })
export class RefGroupeActiviteService {
  public resourceUrl = SERVER_API_URL + 'api/ref-groupe-activites';

  constructor(protected http: HttpClient) {}

  create(refGroupeActivite: IRefGroupeActivite): Observable<EntityResponseType> {
    return this.http.post<IRefGroupeActivite>(this.resourceUrl, refGroupeActivite, { observe: 'response' });
  }

  update(refGroupeActivite: IRefGroupeActivite): Observable<EntityResponseType> {
    return this.http.put<IRefGroupeActivite>(this.resourceUrl, refGroupeActivite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGroupeActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGroupeActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
