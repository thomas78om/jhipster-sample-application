/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActeGestionComponent } from 'app/entities/ref-acte-gestion/ref-acte-gestion.component';
import { RefActeGestionService } from 'app/entities/ref-acte-gestion/ref-acte-gestion.service';
import { RefActeGestion } from 'app/shared/model/ref-acte-gestion.model';

describe('Component Tests', () => {
  describe('RefActeGestion Management Component', () => {
    let comp: RefActeGestionComponent;
    let fixture: ComponentFixture<RefActeGestionComponent>;
    let service: RefActeGestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActeGestionComponent],
        providers: []
      })
        .overrideTemplate(RefActeGestionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefActeGestionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActeGestionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefActeGestion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refActeGestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
