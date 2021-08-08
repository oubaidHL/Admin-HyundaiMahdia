import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtestdriveComponent } from './showtestdrive.component';

describe('ShowtestdriveComponent', () => {
  let component: ShowtestdriveComponent;
  let fixture: ComponentFixture<ShowtestdriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtestdriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtestdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
