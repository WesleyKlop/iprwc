import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurrentNotificationComponent } from './current-notification.component'

describe('CurrentNotificationComponent', () => {
  let component: CurrentNotificationComponent
  let fixture: ComponentFixture<CurrentNotificationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentNotificationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentNotificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
