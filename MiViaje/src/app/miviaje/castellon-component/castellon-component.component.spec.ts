import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastellonComponentComponent } from './castellon-component.component';

describe('CastellonComponentComponent', () => {
  let component: CastellonComponentComponent;
  let fixture: ComponentFixture<CastellonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastellonComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastellonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
