import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerItinerariosComponent } from './ver-itinerarios.component';

describe('VerItinerariosComponent', () => {
  let component: VerItinerariosComponent;
  let fixture: ComponentFixture<VerItinerariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerItinerariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerItinerariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
