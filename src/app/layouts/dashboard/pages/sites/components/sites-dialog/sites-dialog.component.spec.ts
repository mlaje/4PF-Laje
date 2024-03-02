import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDialogComponent } from './sites-dialog.component';

describe('SitesDialogComponent', () => {
  let component: SitesDialogComponent;
  let fixture: ComponentFixture<SitesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
