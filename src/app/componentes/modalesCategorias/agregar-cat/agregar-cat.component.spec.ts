import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCatComponent } from './agregar-cat.component';

describe('AgregarCatComponent', () => {
  let component: AgregarCatComponent;
  let fixture: ComponentFixture<AgregarCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
