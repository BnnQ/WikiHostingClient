import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPageComponent } from './wiki-page.component';

describe('WikiPageComponent', () => {
  let component: WikiPageComponent;
  let fixture: ComponentFixture<WikiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
