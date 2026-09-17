import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailproductPage } from './detailproduct.page';

describe('DetailproductPage', () => {
  let component: DetailproductPage;
  let fixture: ComponentFixture<DetailproductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
