import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCatComponent } from './editar-cat.component';

describe('EditarCatComponent', () => {
  let component: EditarCatComponent;
  let fixture: ComponentFixture<EditarCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
