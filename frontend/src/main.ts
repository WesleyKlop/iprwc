import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log(
      `
Veel success met het hacken van deze applicatie trouwens! :)

Heb je het idee dat je er nou echt niet uit komt mag je wat mij betreft de broncode wel zien:
https://github.com/WesleyKlop/iprwc
`.trim(),
    )
  })
  .catch((err) => console.error(err))
