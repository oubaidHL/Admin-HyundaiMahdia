import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcategoryComponent } from './showcategory.component';

describe('ShowcategoryComponent', () => {
  let component: ShowcategoryComponent;
  let fixture: ComponentFixture<ShowcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
