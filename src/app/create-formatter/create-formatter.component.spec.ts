import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormatterComponent } from './create-formatter.component';

describe('CreateFormatterComponent', () => {
  let component: CreateFormatterComponent;
  let fixture: ComponentFixture<CreateFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
