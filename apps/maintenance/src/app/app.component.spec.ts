import { AppComponent } from "./app.component"

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  describe('ngOnInit', () => {
    it('should set copyright statement', () => {
      fixture.ngOnInit();

      expect(fixture.copyright).toEqual('Copyright 2020 - ' + new Date().getFullYear() + '©');
    })
  })
})
