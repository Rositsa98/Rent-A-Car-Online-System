import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPannelComponent } from './login-pannel.component';

describe('LoginPannelComponent', () => {
  let component: LoginPannelComponent;
  let fixture: ComponentFixture<LoginPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
