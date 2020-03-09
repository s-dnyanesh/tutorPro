import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoubtDeatilPage } from './doubt-deatil.page';

describe('DoubtDeatilPage', () => {
  let component: DoubtDeatilPage;
  let fixture: ComponentFixture<DoubtDeatilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubtDeatilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoubtDeatilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
