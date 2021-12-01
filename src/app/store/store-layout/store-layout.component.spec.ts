import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLayoutComponent } from './store-layout.component';

describe('StoreLayoutComponent', () => {
  let component: StoreLayoutComponent;
  let fixture: ComponentFixture<StoreLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
