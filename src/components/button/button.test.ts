import '../../../dist/circular.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import sinon from 'sinon';
import type OButton from './button.js';

const variants = ['default', 'primary', 'success', 'neutral', 'warning', 'danger'];

describe('<o-button>', () => {
  describe('accessibility tests', () => {
    variants.forEach(variant => {
      it(`should be accessible when variant is "${variant}"`, async () => {
        const el = await fixture<OButton>(html` <o-button variant="${variant}"> Button Label </o-button> `);
        await expect(el).to.be.accessible();
      });
    });
  });

  describe('when provided no parameters', () => {
    it('passes accessibility test', async () => {
      const el = await fixture<OButton>(html` <o-button>Button Label</o-button> `);
      await expect(el).to.be.accessible();
    });

    it('default values are set correctly', async () => {
      const el = await fixture<OButton>(html` <o-button>Button Label</o-button> `);

      expect(el.title).to.equal('');
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.equal(false);
      expect(el.caret).to.equal(false);
      expect(el.loading).to.equal(false);
      expect(el.outline).to.equal(false);
      expect(el.square).to.equal(false);
      expect(el.circle).to.equal(false);
    });

    it('should render as a <button>', async () => {
      const el = await fixture<OButton>(html` <o-button>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('button')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
    });

    it('should not have a spinner present', async () => {
      const el = await fixture<OButton>(html` <o-button>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('o-spinner')).not.to.exist;
    });

    it('should not have a caret present', async () => {
      const el = await fixture<OButton>(html` <o-button>Button Label</o-button> `);
      expect(el.shadowRoot?.querySelector('[part~="caret"]')).not.to.exist;
    });
  });

  describe('when disabled', () => {
    it('passes accessibility test', async () => {
      const el = await fixture<OButton>(html` <o-button disabled>Button Label</o-button> `);
      await expect(el).to.be.accessible();
    });

    it('should disable the native <button> when rendering a <button>', async () => {
      const el = await fixture<OButton>(html` <o-button disabled>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('button[disabled]')).to.exist;
    });

    it('should not disable the native <a> when rendering an <a>', async () => {
      const el = await fixture<OButton>(html` <o-button href="some/path" disabled>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('a[disabled]')).not.to.exist;
    });
  });

  it('should have title if title attribute is set', async () => {
    const el = await fixture<OButton>(html` <o-button title="Test"></o-button> `);
    const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="base"]')!;

    expect(button.title).to.equal('Test');
  });

  describe('when loading', () => {
    it('should have a spinner present', async () => {
      const el = await fixture<OButton>(html` <o-button loading>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('o-spinner')).to.exist;
    });
  });

  describe('when caret', () => {
    it('should have a caret present', async () => {
      const el = await fixture<OButton>(html` <o-button caret>Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('[part~="caret"]')).to.exist;
    });
  });

  describe('when href is present', () => {
    it('should render as an <a>', async () => {
      const el = await fixture<OButton>(html` <o-button href="some/path">Button Label</o-button> `);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
    });

    it('should render a link with rel="noreferrer noopener" when target is set and rel is not', async () => {
      const el = await fixture<OButton>(html` <o-button href="https://example.com/" target="_blank">Link</o-button> `);
      const link = el.shadowRoot!.querySelector('a')!;
      expect(link?.getAttribute('rel')).to.equal('noreferrer noopener');
    });

    it('should render a link with rel="" when a target is provided and rel is empty', async () => {
      const el = await fixture<OButton>(
        html` <o-button href="https://example.com/" target="_blank" rel="">Link</o-button> `
      );
      const link = el.shadowRoot!.querySelector('a')!;
      expect(link?.getAttribute('rel')).to.equal('');
    });

    it(`should render a link with a custom rel when a custom rel is provided`, async () => {
      const el = await fixture<OButton>(
        html` <o-button href="https://example.com/" target="_blank" rel="1">Link</o-button> `
      );
      const link = el.shadowRoot!.querySelector('a')!;
      expect(link?.getAttribute('rel')).to.equal('1');
    });
  });

  describe('when submitting a form', () => {
    it('should submit when the button is inside the form', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form action="" method="post">
          <o-button type="submit">Submit</o-button>
        </form>
      `);
      const button = form.querySelector<OButton>('o-button')!;
      const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
    });

    it('should submit when the button is outside the form and has a form attribute', async () => {
      const el = await fixture(html`
        <div>
          <form id="a" action="" method="post"></form>
          <o-button type="submit" form="a">Submit</o-button>
        </div>
      `);
      const form = el.querySelector<HTMLFormElement>('form')!;
      const button = el.querySelector<OButton>('o-button')!;
      const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
    });

    it('should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used inside a form', async () => {
      const form = await fixture(html`
        <form id="a" action="foo" method="post" target="_self">
          <o-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
            Submit
          </o-button>
        </form>
      `);
      const button = form.querySelector<OButton>('o-button')!;
      const handleSubmit = sinon.spy((event: SubmitEvent) => {
        submitter = event.submitter as HTMLButtonElement;
        event.preventDefault();
      });
      let submitter!: HTMLButtonElement;

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
      expect(submitter.formAction.endsWith('/bar')).to.be.true;
      expect(submitter.formMethod).to.equal('get');
      expect(submitter.formTarget).to.equal('_blank');
      expect(submitter.formNoValidate).to.be.true;
    });

    it('should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used outside a form', async () => {
      const el = await fixture(html`
        <div>
          <form id="a" action="foo" method="post" target="_self"></form>
          <o-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
            Submit
          </o-button>
        </div>
      `);
      const form = el.querySelector<HTMLFormElement>('form')!;
      const button = el.querySelector<OButton>('o-button')!;
      const handleSubmit = sinon.spy((event: SubmitEvent) => {
        submitter = event.submitter as HTMLButtonElement;
        event.preventDefault();
      });
      let submitter!: HTMLButtonElement;

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
      expect(submitter.formAction.endsWith('/bar')).to.be.true;
      expect(submitter.formMethod).to.equal('get');
      expect(submitter.formTarget).to.equal('_blank');
      expect(submitter.formNoValidate).to.be.true;
    });
  });

  describe('when using methods', () => {
    it('should emit o-focus and o-blur when the button is focused and blurred', async () => {
      const el = await fixture<OButton>(html` <o-button>Button</o-button> `);
      const focusHandler = sinon.spy();
      const blurHandler = sinon.spy();

      el.addEventListener('o-focus', focusHandler);
      el.addEventListener('o-blur', blurHandler);

      el.focus();
      await waitUntil(() => focusHandler.calledOnce);

      el.blur();
      await waitUntil(() => blurHandler.calledOnce);

      expect(focusHandler).to.have.been.calledOnce;
      expect(blurHandler).to.have.been.calledOnce;
    });

    it('should emit a click event when calling click()', async () => {
      const el = await fixture<OButton>(html` <o-button></o-button> `);
      const clickHandler = sinon.spy();

      el.addEventListener('click', clickHandler);
      el.click();
      await waitUntil(() => clickHandler.calledOnce);

      expect(clickHandler).to.have.been.calledOnce;
    });
  });

  runFormControlBaseTests({
    tagName: 'o-button',
    variantName: 'type="button"',

    init: (control: OButton) => {
      control.type = 'button';
    }
  });

  runFormControlBaseTests({
    tagName: 'o-button',
    variantName: 'type="submit"',

    init: (control: OButton) => {
      control.type = 'submit';
    }
  });

  runFormControlBaseTests({
    tagName: 'o-button',
    variantName: 'href="xyz"',

    init: (control: OButton) => {
      control.href = 'some-url';
    }
  });
});
