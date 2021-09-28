import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengNextDatepickerComponent } from './primeng-next-datepicker.component';

describe('PrimengNextDatepickerComponent', () => {
  let component: PrimengNextDatepickerComponent;
  let fixture: ComponentFixture<PrimengNextDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimengNextDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengNextDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
