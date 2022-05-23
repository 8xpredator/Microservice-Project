import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpartyComponent } from './editparty.component';

describe('EditpartyComponent', () => {
  let component: EditpartyComponent;
  let fixture: ComponentFixture<EditpartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
