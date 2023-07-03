import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPagesNewComponent } from './test-pages-new.component';

describe('TestPagesNewComponent', () => {
  let component: TestPagesNewComponent;
  let fixture: ComponentFixture<TestPagesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPagesNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPagesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
