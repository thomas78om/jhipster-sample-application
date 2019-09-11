/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ActeGestionDelaiComponent } from 'app/entities/acte-gestion-delai/acte-gestion-delai.component';
import { ActeGestionDelaiService } from 'app/entities/acte-gestion-delai/acte-gestion-delai.service';
import { ActeGestionDelai } from 'app/shared/model/acte-gestion-delai.model';

describe('Component Tests', () => {
  describe('ActeGestionDelai Management Component', () => {
    let comp: ActeGestionDelaiComponent;
    let fixture: ComponentFixture<ActeGestionDelaiComponent>;
    let service: ActeGestionDelaiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ActeGestionDelaiComponent],
        providers: []
      })
        .overrideTemplate(ActeGestionDelaiComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActeGestionDelaiComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActeGestionDelaiService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ActeGestionDelai(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.acteGestionDelais[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
