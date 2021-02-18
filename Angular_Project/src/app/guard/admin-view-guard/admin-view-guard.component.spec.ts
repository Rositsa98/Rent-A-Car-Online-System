import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewGuardComponent } from './admin-view-guard.component';

describe('AdminViewGuardComponent', () => {
  let component: AdminViewGuardComponent;
  let fixture: ComponentFixture<AdminViewGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
