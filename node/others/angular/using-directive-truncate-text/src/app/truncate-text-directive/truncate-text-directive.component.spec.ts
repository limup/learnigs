import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncateTextDirectiveComponent } from './truncate-text-directive.component';

describe('TruncateTextDirectiveComponent', () => {
  let component: TruncateTextDirectiveComponent;
  let fixture: ComponentFixture<TruncateTextDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruncateTextDirectiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TruncateTextDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
