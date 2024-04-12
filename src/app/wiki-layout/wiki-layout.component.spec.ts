import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiLayoutComponent } from './wiki-layout.component';

describe('WikiLayoutComponent', () => {
  let component: WikiLayoutComponent;
  let fixture: ComponentFixture<WikiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
