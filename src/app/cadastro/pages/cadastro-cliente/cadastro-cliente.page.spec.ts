import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaCadastralPage } from './cadastro-cliente.page';

describe('TelaCadastralPage', () => {
  let component: TelaCadastralPage;
  let fixture: ComponentFixture<TelaCadastralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaCadastralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
