import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeniscolaComponentComponent } from './peniscola-component.component';

describe('PeniscolaComponentComponent', () => {
  let component: PeniscolaComponentComponent;
  let fixture: ComponentFixture<PeniscolaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeniscolaComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeniscolaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
