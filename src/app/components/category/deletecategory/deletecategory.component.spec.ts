import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecategoryComponent } from './deletecategory.component';

describe('DeletecategoryComponent', () => {
  let component: DeletecategoryComponent;
  let fixture: ComponentFixture<DeletecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
