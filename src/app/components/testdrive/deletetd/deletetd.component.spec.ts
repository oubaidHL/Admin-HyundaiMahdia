import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetdComponent } from './deletetd.component';

describe('DeletetdComponent', () => {
  let component: DeletetdComponent;
  let fixture: ComponentFixture<DeletetdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletetdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
