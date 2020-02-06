import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationGuardComponent } from './authentication-guard.component';

describe('AuthenticationGuardComponent', () => {
  let component: AuthenticationGuardComponent;
  let fixture: ComponentFixture<AuthenticationGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
