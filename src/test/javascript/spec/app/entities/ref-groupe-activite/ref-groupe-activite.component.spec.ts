/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RefGroupeActiviteComponent } from 'app/entities/ref-groupe-activite/ref-groupe-activite.component';
import { RefGroupeActiviteService } from 'app/entities/ref-groupe-activite/ref-groupe-activite.service';
import { RefGroupeActivite } from 'app/shared/model/ref-groupe-activite.model';

describe('Component Tests', () => {
  describe('RefGroupeActivite Management Component', () => {
    let comp: RefGroupeActiviteComponent;
    let fixture: ComponentFixture<RefGroupeActiviteComponent>;
    let service: RefGroupeActiviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RefGroupeActiviteComponent],
        providers: []
      })
        .overrideTemplate(RefGroupeActiviteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGroupeActiviteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGroupeActiviteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGroupeActivite(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGroupeActivites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
