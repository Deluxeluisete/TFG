import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenicassimComponentComponent } from './benicassim-component.component';

describe('BenicassimComponentComponent', () => {
  let component: BenicassimComponentComponent;
  let fixture: ComponentFixture<BenicassimComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenicassimComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenicassimComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
