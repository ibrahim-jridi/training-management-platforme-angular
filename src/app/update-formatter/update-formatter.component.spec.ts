import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormatterComponent } from './update-formatter.component';

describe('UpdateFormatterComponent', () => {
  let component: UpdateFormatterComponent;
  let fixture: ComponentFixture<UpdateFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFormatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
