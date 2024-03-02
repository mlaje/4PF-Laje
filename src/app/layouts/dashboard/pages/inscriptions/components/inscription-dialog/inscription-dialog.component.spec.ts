import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDialogComponent } from './inscription-dialog.component';

describe('InscriptionDialogComponent', () => {
  let component: InscriptionDialogComponent;
  let fixture: ComponentFixture<InscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
