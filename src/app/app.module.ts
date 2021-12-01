import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from './store/store.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
