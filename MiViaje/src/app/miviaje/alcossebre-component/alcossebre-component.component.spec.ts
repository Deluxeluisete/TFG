import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcossebreComponentComponent } from './alcossebre-component.component';

describe('AlcossebreComponentComponent', () => {
  let component: AlcossebreComponentComponent;
  let fixture: ComponentFixture<AlcossebreComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcossebreComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcossebreComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
