import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditProductModalComponent } from './add-or-edit-product-modal.component';

describe('AddOrEditProductModalComponent', () => {
  let component: AddOrEditProductModalComponent;
  let fixture: ComponentFixture<AddOrEditProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
