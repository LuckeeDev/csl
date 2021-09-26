import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesHomeView } from './articles-home.view';

describe('ArticlesHomeView', () => {
  let component: ArticlesHomeView;
  let fixture: ComponentFixture<ArticlesHomeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesHomeView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesHomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
