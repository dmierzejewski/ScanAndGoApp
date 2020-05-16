import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatalogOptionsPage } from './catalog-options.page';

describe('CatalogOptionsPage', () => {
  let component: CatalogOptionsPage;
  let fixture: ComponentFixture<CatalogOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
