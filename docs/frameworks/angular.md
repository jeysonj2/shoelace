# Angular

Angular [plays nice](https://custom-elements-everywhere.com/#angular) with custom elements, so you can use Shoelace in your Angular apps with ease.

## Installation

To add Shoelace to your Angular app, install the package from npm.

```bash
npm install %PACKAGE_NAME%
```

Next, [include a theme](/getting-started/themes) into your project. In this example, we'll import the light theme and use the CDN as a base path.

Include the theme into your `angular.json` config.

```json
...
"styles": [
  "src/app/theme/styles.scss",
  "%PACKAGE_NAME%/dist/themes/light.css"
],
...
```

OR
include it into your `styles.scss`.

```scss
@use "%PACKAGE_NAME%/dist/themes/light.css";
...
```

After that set the [base path](/getting-started/installation#setting-the-base-path) in your `AppModule` for icons and other assets.

```jsx
import { setBasePath } from '%PACKAGE_NAME%/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/%PACKAGE_NAME%@%PACKAGE_VERSION%/dist/');
```

?> If you'd rather not use the CDN for assets, you can create a build task that copies `node_modules/%PACKAGE_NAME%/dist/assets` into a public folder in your app. Then you can point the base path to that folder instead.

## Configuration

Then make sure to apply the custom elements schema as shown below.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { setBasePath } from '%PACKAGE_NAME%/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/%PACKAGE_NAME%@%PACKAGE_VERSION%/dist/');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

## Reference Shoelace components in your Angular component code

```js
import { SlDrawer } from '%PACKAGE_NAME%';

@Component({
  selector: 'app-drawer-example',
  template: '<div id="page"><button (click)="showDrawer()">Show drawer</button><sl-drawer #drawer label="Drawer" class="drawer-focus" style="--size: 50vw"><p>Drawer content</p></sl-drawer></div>',
  providers: [SlDrawer]
})
export class DrawerExampleComponent implements OnInit {

  // use @ViewChild to get a reference to the #drawer element within component template
  @ViewChild('drawer')
  drawer?: ElementRef<SlDrawer>;

  ...

  constructor(...) {
  }

  ngOnInit() {
  }

  ...

  showDrawer() {
    // use nativeElement to access Shoelace components
    this.drawer?.nativeElement.show();
  }
}
```

Now you can start using Shoelace components in your app!

?> Are you using Shoelace with Angular? [Help us improve this page!](%REPO_URL%/blob/next/docs/frameworks/angular.md)