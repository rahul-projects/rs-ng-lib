import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengQuarterPickerComponent } from './primeng-quarter-picker.component';

describe('PrimengQuarterPickerComponent', () => {
  let component: PrimengQuarterPickerComponent;
  let fixture: ComponentFixture<PrimengQuarterPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimengQuarterPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengQuarterPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
