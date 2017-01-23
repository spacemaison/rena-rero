import { defaults as defaultIconStyles } from '../styles/icon'

export class Styles {
  constructor ({
      button = new ButtonStyle(),
      icon = new IconStyle() } = {}) {
    Object.assign(this, { button, icon })
  }
}

export class Style {
  constructor ({ style = null } = {}) {
    this.style = style
  }
}

export class ButtonStyle extends Style {}

export class IconStyle extends Style {
  constructor ({ font, color, size } = {}) {
    super(...arguments)

    this.font = font || defaultIconStyles.font
    this.color = color || defaultIconStyles.color
    this.size = size || defaultIconStyles.size
  }
}
