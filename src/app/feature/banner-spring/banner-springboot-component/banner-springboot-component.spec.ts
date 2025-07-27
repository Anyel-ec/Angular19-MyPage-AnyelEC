import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSpringbootComponent } from './banner-springboot-component';

describe('BannerSpringbootComponent', () => {
  let component: BannerSpringbootComponent;
  let fixture: ComponentFixture<BannerSpringbootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSpringbootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSpringbootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
