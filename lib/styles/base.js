import { color } from './color'

export const SIZE_UNIT = 8
export const size = Object.freeze({
  one: SIZE_UNIT,
  two: SIZE_UNIT * 2,
  three: SIZE_UNIT * 3,
  four: SIZE_UNIT * 4,
  five: SIZE_UNIT * 5,
  six: SIZE_UNIT * 6,
  seven: SIZE_UNIT * 7,
  eight: SIZE_UNIT * 8,
  nine: SIZE_UNIT * 9,
  ten: SIZE_UNIT * 10
})

export const sizes = Object.freeze({
  buttonHeight: size.five,
  text: size.two - 2,
  header: size.three
})

export const colors = Object.freeze({
  foreground: color('black'),
  background: color('white'),
  buttonBackground: color('red'),
  buttonForeground: color('white')
})
