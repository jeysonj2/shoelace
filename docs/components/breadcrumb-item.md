# Breadcrumb Item

[component-header:sl-breadcrumb-item]

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>
    <sl-icon slot="prefix" name="house"></sl-icon>
    Home
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
  <sl-breadcrumb-item>Shirts</sl-breadcrumb-item>
</sl-breadcrumb>
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem, SlIcon } from '%PACKAGE_NAME%/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>
      <SlIcon slot="prefix" name="house"></SlIcon>
      Home
    </SlBreadcrumbItem>
    <SlBreadcrumbItem>Clothing</SlBreadcrumbItem>
    <SlBreadcrumbItem>Shirts</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

?> Additional demonstrations can be found in the [breadcrumb examples](/components/breadcrumb).

[component-metadata:sl-breadcrumb-item]