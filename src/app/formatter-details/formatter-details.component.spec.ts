import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterDetailsComponent } from './formatter-details.component';

describe('FormatterDetailsComponent', () => {
  let component: FormatterDetailsComponent;
  let fixture: ComponentFixture<FormatterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
