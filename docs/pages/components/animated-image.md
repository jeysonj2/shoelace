---
meta:
  title: Animated Image
  description: A component for displaying animated GIFs and WEBPs that play and pause on interaction.
layout: component
---

```html:preview
<o-animated-image src="/assets/images/walk.gif" alt="Animation of untied shoes walking on pavement"></o-animated-image>
```

```jsx:react
import { OAnimatedImage } from 'O-PACKAGE-FULL-NAME-O/dist/react';

const App = () => <OAnimatedImage src="/assets/images/walk.gif" alt="Animation of untied shoes walking on pavement" />;
```

:::tip
This component uses `<canvas>` to draw freeze frames, so images are subject to [cross-origin restrictions](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
:::

## Examples

### WEBP Images

Both GIF and WEBP images are supported.

```html:preview
<o-animated-image src="/assets/images/tie.webp" alt="Animation of a shoe being tied"></o-animated-image>
```

```jsx:react
import { OAnimatedImage } from 'O-PACKAGE-FULL-NAME-O/dist/react';

const App = () => <OAnimatedImage src="/assets/images/tie.webp" alt="Animation of a shoe being tied" />;
```

### Setting a Width and Height

To set a custom size, apply a width and/or height to the host element.

```html:preview
<o-animated-image
  src="/assets/images/walk.gif"
  alt="Animation of untied shoes walking on pavement"
  style="width: 150px; height: 200px;"
>
</o-animated-image>
```

{% raw %}

```jsx:react
import { OAnimatedImage } from 'O-PACKAGE-FULL-NAME-O/dist/react';

const App = () => (
  <OAnimatedImage
    src="/assets/images/walk.gif"
    alt="Animation of untied shoes walking on pavement"
    style={{ width: '150px', height: '200px' }}
  />
);
```

{% endraw %}

### Customizing the Control Box

You can change the appearance and location of the control box by targeting the `control-box` part in your styles.

```html:preview
<o-animated-image
  src="/assets/images/walk.gif"
  alt="Animation of untied shoes walking on pavement"
  class="animated-image-custom-control-box"
></o-animated-image>

<style>
  .animated-image-custom-control-box::part(control-box) {
    top: auto;
    right: auto;
    bottom: 1rem;
    left: 1rem;
    background-color: deeppink;
    border: none;
    color: pink;
  }
</style>
```

```jsx:react
import { OAnimatedImage } from 'O-PACKAGE-FULL-NAME-O/dist/react';

const css = `
  .animated-image-custom-control-box::part(control-box) {
    top: auto;
    right: auto;
    bottom: 1rem;
    left: 1rem;
    background-color: deeppink;
    border: none;
    color: pink;
  }
`;

const App = () => (
  <>
    <OAnimatedImage
      className="animated-image-custom-control-box"
      src="/assets/images/walk.gif"
      alt="Animation of untied shoes walking on pavement"
    />

    <style>{css}</style>
  </>
);
```
