import { Block } from '../../utils/Block';
import template from './login.hbs';
import Button from '../../components/Button';
import './login.less';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Form from '../../components/Form';
import { focusin, focusout, submit } from '../../utils/events';
import { SigninData } from '../../types/types';
import AuthController from '../../controllers/AuthControllers';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    // @ts-ignore
    this.children.form = new Form({
      formClass: 'fields',
      inputs: [
        new Input({
          class: 'input-form',
          spanClass: 'input-form__title',
          label: 'Login',
          inputClass: 'input-form__input',
          inputType: 'text',
          inputName: 'login',
          inputPlaceholder: '',
          events: {
            focusin,
            focusout,
          },
        }),
        new Input({
          class: 'input-form',
          spanClass: 'input-form__title',
          label: 'Password',
          inputClass: 'input-form__input',
          inputType: 'password',
          inputName: 'password',
          inputPlaceholder: '',
          events: {
            focusin,
            focusout,
          },
        }),
      ],
      buttonClass: 'login__link',
      button: new Button({
        label: 'Sign in',
        class: 'button-link',
        type: 'submit',
        events: {
          click: (e) => this.onSubmit(e),
        },
      }),
      events: { submit },
    });
    this.children.link = new Link({
      class: 'text-link',
      href: '/registration',
      label: 'Sign Up',
    });
    this.children.chatLink = new Link({
      class: 'text-link',
      href: '/chat',
      label: 'Chat',
    });
    this.children.error404Link = new Link({
      class: 'text-link',
      href: '/error404',
      label: '404',
    });

    this.children.error500Link = new Link({
      class: 'text-link',
      href: '/error500',
      label: '500',
    });
  }

  onSubmit(e: Event) {
    submit(e);
    const inputs = document.getElementsByTagName('input');
    const data: Record<string, string> = {};
    Array.from(inputs).forEach((input) => {
      data[input.name] = input.value;
    });
    AuthController.signin(data as SigninData);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
