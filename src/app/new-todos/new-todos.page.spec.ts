import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTodosPage } from './new-todos.page';

describe('NewTodosPage', () => {
  let component: NewTodosPage;
  let fixture: ComponentFixture<NewTodosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
