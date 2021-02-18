import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPannelComponent } from './registration-pannel.component';

describe('RegistrationPannelComponent', () => {
  let component: RegistrationPannelComponent;
  let fixture: ComponentFixture<RegistrationPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
