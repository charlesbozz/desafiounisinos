import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesClientePage } from './detalhes-cliente.page';

describe('DetalhesClientePage', () => {
  let component: DetalhesClientePage;
  let fixture: ComponentFixture<DetalhesClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
