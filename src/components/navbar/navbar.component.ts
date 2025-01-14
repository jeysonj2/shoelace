import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import LibraryBaseElement from '../../internal/library-base-element.js';
// import { LocalizeController } from '../../utilities/localize';
import OButton from '../button/button.component.js';
import ODivider from '../divider/divider.component.js';
import OIcon from '../icon/icon.component.js';
import ONavbarItem from '../navbar-item/navbar-item.component.js';
import styles from './navbar.styles.js';
import type { CSSResultGroup } from 'lit';
import type { Mode, SelectEvent } from './navbar.types.js';
// import type { SelectEvent, Mode } from './navbar.types';

/**
 * @summary Short summary of the component's intended use.
 * @documentation /components/navbar
 * @status wip
 * @since 1.5
 *
 * @dependency o-icon
 * @dependency o-button
 * @dependency o-navbar-item
 * @dependency o-divider
 *
 * @event o-select - { id: string } of selected navbar-item
 *
 * @slot - The default slot for navbar-items.
 * @slot logo - The slot for the logo, it is shown when the navbar is opened.
 * @slot logo-small - The slot for the small logo, it is shown when the navbar is closed.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The component's header wrapper.
 * @csspart body - The component's body wrapper.
 *
 * @property selected - string - sets the pre-selected item
 * @property noHamburger - boolean
 * @property mode - "open" | "collapsed" | "hover"
 *
 * @cssproperty --o-navbar-light-background-color
 * @cssproperty --o-navbar-light-hamburger-background-color
 * @cssproperty --o-navbar-light-hamburger-background-color-hover
 * @cssproperty --o-navbar-light-hamburger-background-color-active
 * @cssproperty --o-navbar-light-hamburger-hover-background-color-hover
 */
export default class ONavbar extends LibraryBaseElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'o-icon': OIcon,
    'o-button': OButton,
    'o-navbar-item': ONavbarItem,
    'o-divider': ODivider
  };

  // private readonly localize = new LocalizeController(this);

  @property({ reflect: true }) mode: Mode = 'open';
  @property({ reflect: true, type: Boolean, attribute: 'no-hamburger' }) noHamburger = false;
  @property() selected?: string;

  @query('div.box') boxTemplateElement!: HTMLDivElement;

  private items: ONavbarItem[] = [];
  private currentSelected?: ONavbarItem;
  private currentAncestorSelected?: ONavbarItem;

  // update handlers
  @watch('selected')
  updateSelected() {
    for (const item of this.items) {
      const element = this.recursiveFindItem(item);
      if (element) {
        element.handleClick();
      }
    }
  }

  private recursiveFindItem(item: ONavbarItem): ONavbarItem | null {
    if (item.id === this.selected || item.text === this.selected) return item;

    for (const i of item.subitems) {
      const found = this.recursiveFindItem(i);
      if (found) return found;
    }

    return null;
  }

  // event handlers
  private handleHamburgerClick = () => {
    // this.open = !this.open;
    if (this.boxTemplateElement) this.boxTemplateElement.setAttribute('elevation', 'none');
    if (this.mode === 'open') {
      this.mode = 'collapsed';
    } else if (this.mode === 'collapsed') {
      this.mode = 'hover';
      if (this.boxTemplateElement) this.boxTemplateElement.setAttribute('elevation', 'large');
    } else if (this.mode === 'hover') {
      this.mode = 'open';
    }

    this.dispatchEvent(new Event('change'));
  };

  private handleSlotChange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements();
      elements.forEach(element => {
        if (element instanceof ONavbarItem) {
          if (!element.hasAttribute('navbar-init')) {
            element.addEventListener('select', this.handleItemSelect);
            element.addEventListener('child-select', this.handleAncestorSelect);
            element.setAttribute('navbar-init', 'true');
            this.items.push(element);
          }
        }
      });

      if (this.selected) {
        this.updateSelected();
      }
    }
  };

  private handleItemSelect = (e: Event) => {
    if (e.target instanceof ONavbarItem) {
      this.currentAncestorSelected?.deselect();
      if (e.target !== this.currentSelected) {
        this.currentSelected?.deselect();
      }
      this.currentSelected = e.target;

      this.dispatchEvent(new CustomEvent<SelectEvent>('o-select', { detail: { id: e.target.id || e.target.text } }));
    }
  };

  private handleAncestorSelect = (e: Event) => {
    if (e instanceof CustomEvent && e.target instanceof ONavbarItem) {
      const childTarget = e.detail as ONavbarItem;
      if (e.target !== this.currentAncestorSelected) {
        this.currentAncestorSelected?.deselect();
      }
      if (childTarget !== this.currentSelected) {
        this.currentSelected?.deselect();
        this.currentSelected = childTarget;

        this.dispatchEvent(
          new CustomEvent<SelectEvent>('o-select', { detail: { id: childTarget.id || childTarget.text } })
        );
      }
      this.currentAncestorSelected = e.target;
    }
  };

  render() {
    return html`
      <div class="box" part="base">
        <header part="header">
          <slot name="logo"><o-icon class="logo" src="/assets/images/circular-logo-light.svg"></o-icon></slot>
          <o-button variant="text" circle size="small" @click="${this.handleHamburgerClick}">
            <span class="hover">
              <slot name="logo-small"
                ><o-icon src="/assets/images/circular-icon.svg" style="font-size: var(--o-font-size-x-large)"></o-icon>
              </slot>
            </span>
            <o-icon library="material" name="menu" style="font-size: var(--o-font-size-large)" class="open"></o-icon>
            <o-icon
              library="material"
              name="menu_open"
              style="font-size: var(--o-font-size-large)"
              class="collapsed"
            ></o-icon>
          </o-button>
        </header>
        <o-divider></o-divider>
        <div part="body" class="body">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'o-navbar': ONavbar;
  }
}
