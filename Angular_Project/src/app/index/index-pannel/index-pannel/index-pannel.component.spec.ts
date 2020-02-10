import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPannelComponent } from './index-pannel.component';

describe('IndexPannelComponent', () => {
  let component: IndexPannelComponent;
  let fixture: ComponentFixture<IndexPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
