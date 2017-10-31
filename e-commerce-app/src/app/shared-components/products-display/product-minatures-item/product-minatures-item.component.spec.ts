import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMiniaturesComponent } from './product-minatures-item.component';

describe('ProductMiniaturesComponent', () => {
  let component: ProductMiniaturesComponent;
  let fixture: ComponentFixture<ProductMiniaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMiniaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMiniaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
