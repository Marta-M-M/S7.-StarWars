import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardsComponent } from './starship-cards.component';

describe('StarshipCardsComponent', () => {
  let component: StarshipCardsComponent;
  let fixture: ComponentFixture<StarshipCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
