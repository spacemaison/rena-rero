import { StyleSheet } from './StyleSheet'
import { colors, sizes, size } from './base'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    height: sizes.buttonHeight,
    padding: size.one,
    borderColor: colors.buttonForeground,
    borderWidth: 1
  },

  buttonText: {
    color: colors.buttonForeground
  }
})
