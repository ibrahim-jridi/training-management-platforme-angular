import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterListComponent } from './formatter-list.component';

describe('FormatterListComponent', () => {
  let component: FormatterListComponent;
  let fixture: ComponentFixture<FormatterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
