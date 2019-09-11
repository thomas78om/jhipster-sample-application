/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefActiviteComponent } from 'app/entities/ref-activite/ref-activite.component';
import { RefActiviteService } from 'app/entities/ref-activite/ref-activite.service';
import { RefActivite } from 'app/shared/model/ref-activite.model';

describe('Component Tests', () => {
  describe('RefActivite Management Component', () => {
    let comp: RefActiviteComponent;
    let fixture: ComponentFixture<RefActiviteComponent>;
    let service: RefActiviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefActiviteComponent],
        providers: []
      })
        .overrideTemplate(RefActiviteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefActiviteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefActiviteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefActivite(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refActivites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
