import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasellaComponent } from './casella.component';

describe('CasellaComponent', () => {
  let component: CasellaComponent;
  let fixture: ComponentFixture<CasellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasellaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
