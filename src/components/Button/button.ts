import { Block } from '../../utils/Block';
import template from './button.hbs';
import './button.less';

interface ButtonProps {
  label: string
  class: string
  type?: string
  events?: {
    click: (e: Event) => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
