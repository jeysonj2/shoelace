import '../../../dist/circular.js';
import { expect, fixture, html } from '@open-wc/testing';
import type OProgressBar from './progress-bar.js';

describe('<o-progress-bar>', () => {
  let el: OProgressBar;

  describe('when provided just a value parameter', () => {
    before(async () => {
      el = await fixture<OProgressBar>(html`<o-progress-bar value="25"></o-progress-bar>`);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });

  describe('when provided a title, and value parameter', () => {
    let base: HTMLDivElement;
    let indicator: HTMLDivElement;

    before(async () => {
      el = await fixture<OProgressBar>(html`<o-progress-bar title="Titled Progress Ring" value="25"></o-progress-bar>`);
      base = el.shadowRoot!.querySelector('[part~="base"]')!;
      indicator = el.shadowRoot!.querySelector('[part~="indicator"]')!;
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('uses the value parameter on the base, as aria-valuenow', () => {
      expect(base).attribute('aria-valuenow', '25');
    });

    it('appends a % to the value, and uses it as the  the value parameter to determine the width on the "indicator" part', () => {
      expect(indicator).attribute('style', 'width:25%;');
    });
  });

  describe('when provided an indeterminate parameter', () => {
    let base: HTMLDivElement;

    before(async () => {
      el = await fixture<OProgressBar>(
        html`<o-progress-bar title="Titled Progress Ring" indeterminate></o-progress-bar>`
      );
      base = el.shadowRoot!.querySelector('[part~="base"]')!;
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should append a progress-bar--indeterminate class to the "base" part.', () => {
      expect(base.classList.value.trim()).to.eq('progress-bar progress-bar--indeterminate');
    });
  });

  describe('when provided a ariaLabel, and value parameter', () => {
    before(async () => {
      el = await fixture<OProgressBar>(
        html`<o-progress-bar ariaLabel="Labelled Progress Ring" value="25"></o-progress-bar>`
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });

  describe('when provided a ariaLabelledBy, and value parameter', () => {
    before(async () => {
      el = await fixture<OProgressBar>(
        html`
          <label id="labelledby">Progress Ring Label</label>
          <o-progress-bar ariaLabelledBy="labelledby" value="25"></o-progress-bar>
        `
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });
});
