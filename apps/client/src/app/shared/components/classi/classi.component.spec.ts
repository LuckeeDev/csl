import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassiComponent } from './classi.component';

describe('ClassiComponent', () => {
  let component: ClassiComponent;
  let fixture: ComponentFixture<ClassiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
