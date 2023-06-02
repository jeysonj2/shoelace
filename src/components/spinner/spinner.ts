import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize';
import LibraryBaseElement from '../../internal/library-base-element';
import styles from './spinner.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @documentation https://circular-o.github.io/circular/#/components/spinner
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
@customElement('o-spinner')
export default class OSpinner extends LibraryBaseElement {
  static styles: CSSResultGroup = styles;

  private readonly localize = new LocalizeController(this);

  render() {
    return html`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term('loading')}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'o-spinner': OSpinner;
  }
}
