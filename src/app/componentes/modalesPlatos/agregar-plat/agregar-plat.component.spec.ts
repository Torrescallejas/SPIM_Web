import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPlatComponent } from './agregar-plat.component';

describe('AgregarPlatComponent', () => {
  let component: AgregarPlatComponent;
  let fixture: ComponentFixture<AgregarPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPlatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
