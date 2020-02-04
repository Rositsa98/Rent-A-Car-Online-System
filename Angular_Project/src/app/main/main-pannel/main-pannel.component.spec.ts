import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPannelComponent } from './main-pannel.component';

describe('MainPannelComponent', () => {
  let component: MainPannelComponent;
  let fixture: ComponentFixture<MainPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
