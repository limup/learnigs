import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatabindComponent } from './input-databind.component';

describe('InputDatabindComponent', () => {
  let component: InputDatabindComponent;
  let fixture: ComponentFixture<InputDatabindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDatabindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDatabindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
