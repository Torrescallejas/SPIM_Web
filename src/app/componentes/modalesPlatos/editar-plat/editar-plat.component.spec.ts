import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlatComponent } from './editar-plat.component';

describe('EditarPlatComponent', () => {
  let component: EditarPlatComponent;
  let fixture: ComponentFixture<EditarPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPlatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
