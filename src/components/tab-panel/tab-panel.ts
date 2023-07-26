import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { watch } from '../../internal/watch.js';
import LibraryBaseElement from '../../internal/library-base-element.js';
import styles from './tab-panel.styles.js';
import type { CSSResultGroup } from 'lit';

let id = 0;

/**
 * @summary Tab panels are used inside [tab groups](/components/tab-group) to display tabbed content.
 * @documentation /components/tab-panel
 * @status stable
 * @since 1.5
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
@customElement('o-tab-panel')
export default class OTabPanel extends LibraryBaseElement {
  static styles: CSSResultGroup = styles;

  private readonly attrId = ++id;
  private readonly componentId = `o-tab-panel-${this.attrId}`;

  /** The tab panel's name. */
  @property({ reflect: true }) name = '';

  /** When true, the tab panel will be shown. */
  @property({ type: Boolean, reflect: true }) active = false;

  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute('role', 'tabpanel');
  }

  @watch('active')
  handleActiveChange() {
    this.setAttribute('aria-hidden', this.active ? 'false' : 'true');
  }

  render() {
    return html`
      <slot
        part="base"
        class=${classMap({
          'tab-panel': true,
          'tab-panel--active': this.active
        })}
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'o-tab-panel': OTabPanel;
  }
}
