import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasPropietarioPage } from './citas-propietario.page';

describe('CitasPropietarioPage', () => {
  let component: CitasPropietarioPage;
  let fixture: ComponentFixture<CitasPropietarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPropietarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
