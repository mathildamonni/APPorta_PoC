import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await expect(fixture.debugElement.componentInstance).toBeTruthy();
  });
  // TODO: add more tests!
});
