import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it("should initialize title property with 'Yo Contigo Challenge'", () => {
    const appComponent = new AppComponent();
    expect(appComponent.title).toBe('Yo Contigo Challenge');
  });
});
