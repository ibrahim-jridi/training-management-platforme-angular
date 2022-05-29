import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationHomeComponent } from './formation-home.component';

describe('FormationHomeComponent', () => {
  let component: FormationHomeComponent;
  let fixture: ComponentFixture<FormationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
